import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { SandpackLayout, SandpackProvider } from '@codesandbox/sandpack-react';
import { intervalToDuration } from 'date-fns';
import Frame from 'react-frame-component';
import Sandbox from './Coding/Sandbox';
import CodeInsights from './Coding/CodeInsights';

import {
  problem1,
  problem2,
  // problem3,
  // problem4,
  // problem5,
  // problem6,
  // problem7,
} from './Coding/problems';

function Coding() {
  // const [user, setUser] = useState<any>();
  const [userInput, setUserInput] = useState<string | undefined>('');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problem, setProblem] = useState<Problem>();
  const [error, setError] = useState<string>('');
  const [solved, setSolved] = useState<boolean | string>(false);
  const [number, setNumber] = useState<number | undefined>();
  const [tests, setTests] = useState<number>(0);
  const [solveTime, setSolveTime] = useState<number>(0);
  const [runtime, setRuntime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [toggleHint, setToggleHint] = useState<boolean>(false);
  const [safelyRunCode, setSafelyRunCode] = useState<boolean>(false);
  const [results, setResults] = useState<Result[]>([]);

  const level: Dict = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert',
  };

  useEffect(() => {
    const fetchData = async (receivedProblems: Problem[]) => {
      // const receivedProblems = await apiService.getProblems();
      // const user = await apiService.getUser();
      // setUser(user);

      // filter out problems that are not solved
      // const filteredProblems = receivedProblems.filter(
      // (problem) => !user.solutions.map((solution) => solution.problemId)
      // .includes(problem._id)
      // );

      // filter by level
      // const filteredProblems = receivedProblems.filter(
      //   (problem) => problem.level === 1
      // );

      // sort by level
      // receivedProblems.sort((a, b) => a.level - b.level);

      // shuffle problems
      // for (let i = receivedProblems.length - 1; i > 0; i--) {
      //   const j = Math.floor(Math.random() * (i + 1));
      //   [receivedProblems[i], receivedProblems[j]] = [
      //     receivedProblems[j],
      //     receivedProblems[i],
      //   ];
      // }

      setProblems(receivedProblems);
      setNumber(0);
    };

    fetchData([
      problem1,
      problem2,
      // problem3,
      // problem4,
      // problem5,
      // problem6,
      // problem7,
    ]);
  }, []);

  useEffect(() => {
    // Change problem when number increases
    if ((number as number) < problems.length) {
      setError('');
      setSolved('');
      setRuntime(0);
      setResults([]);
      setSolveTime(performance.now());
      setProblem(problems[number as number]);
      setUserInput(problem?.function);
    }
  }, [number]);

  useEffect(() => {
    // Check if user solved problem
    if (results.length === 3) {
      setSafelyRunCode(false);

      const { runtime: runtime1, output: output1, error: error1 } = results[0];
      const { runtime: runtime2, output: output2, error: error2 } = results[1];
      const { runtime: runtime3, output: output3, error: error3 } = results[2];

      const testsPassed =
        (output1 === problem?.solution1[1] ? 1 : 0) +
        (output2 === problem?.solution2[1] ? 1 : 0) +
        (output3 === problem?.solution3[1] ? 1 : 0);

      setTests(testsPassed);

      if (testsPassed === 3) {
        const endTime = performance.now();
        const averageTime = (runtime1 + runtime2 + runtime3) / 3;
        setSolveTime(endTime - solveTime);
        setRuntime(averageTime);
        if (!solved) setScore((prevScore) => prevScore + 100);
        setSolved(true);
        setError('');
      }

      if (error1 || error2 || error3) {
        if (solved) setScore((prevScore) => prevScore - 100);
        if (error1) setError(error1);
        else if (error2) setError(error2);
        else if (error3) setError(error3);
        setSolved(false);
      }

      if (testsPassed < 3 && !error1 && !error2 && !error3) {
        if (solved) setScore((prevScore: number) => prevScore - 100);
        setError('');
        setSolved(false);
      }
    }
  }, [results]);

  const handleNext = () => {
    //save solution to db
    // apiService.saveSolution({
    //   userId: user._id,
    //   problemId: problem._id,
    //   solution: problem.function,
    //   score: score,
    //   runtime: number,
    //   solveTime: number
    // });
    setNumber((prevNumber) => (prevNumber as number) + 1);
  };

  const handleHint = () => {
    setToggleHint(!toggleHint);
  };

  const handleChange = (input: any) => {
    setUserInput(input);
  };

  const runCode = () => {
    setTests(0);
    setSafelyRunCode(true);
  };

  const prettifyTime = (time: number) => {
    const duration = intervalToDuration({ start: 0, end: time as number });
    if (duration.hours === 0 && duration.minutes === 0)
      return `${duration.seconds}s`;
    else if (duration.hours === 0)
      return `${duration.minutes}m ${duration.seconds}s`;
    else return `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
  };

  return (
    <>
      <div style={{ display: 'none' }}>
        <Frame>
          <Sandbox
            userInput={userInput}
            problem={problem}
            safelyRunCode={safelyRunCode}
            onResult={(receivedResults: Result[]) =>
              setResults(receivedResults)
            }
          />
        </Frame>
      </div>
      <div
        className='h-screen w-screen transition duration-200 ease-in-out p-20'
        style={{
          color: 'rgba(38, 38, 38, 1)',
          backgroundColor: 'rgba(248, 247, 249, 1)',
        }}
      >
        {problem && (number as number) < problems.length ? (
          <div className='flex items-center justify-center h-full w-full'>
            <div className='border border-teal-600 rounded-md mr-8 p-4 h-full min-h-max w-1/4 flex flex-col bg-white'>
              <div className='text-right'>
                Score: <span className='font-bold'>{score}</span>
              </div>
              <h2 className='text-xl font-bold'>{problem.name}</h2>
              <h3>{problem.description}</h3>
              <br />
              <p>
                Level: <span className='font-bold'>{level[problem.level]}</span>
              </p>

              <p
                onClick={handleHint}
                className='mt-4 italic text-sm cursor-pointer hover:font-bold'
              >
                Get a hint <br />
                {toggleHint && problem.hint}
                <br />
              </p>

              {tests !== 0 && (
                <div className='text-sm'>
                  <p>Tests passed: {tests}/3</p>
                  <br />
                </div>
              )}

              {!solved && solved !== '' && (
                <div className='font-bold'>
                  <h4> Wrong solution! </h4>
                  <br />
                  <p className='italic text-sm text-red-500'>{error}</p>
                </div>
              )}
              {solved && (
                <div>
                  <h4 className='text-pink-500 font-bold'>Correct solution!</h4>
                  <br />
                  <p className='text-sm'>Run time: {runtime.toFixed(4)}ms</p>
                  <p className='text-sm'>
                    Solve time: {prettifyTime(solveTime)}
                  </p>
                </div>
              )}
            </div>

            <div className='mx-4 text-center w-3/4'>
              <Editor
                className='border p-0.5 border-teal-600 rounded-md bg-white'
                height='65vh'
                defaultLanguage={problem.language}
                theme='vs-light'
                value={problem.function}
                onChange={handleChange}
                options={{
                  minimap: {
                    enabled: false,
                  },
                  wordWrap: 'on',
                  tabSize: 2,
                }}
              />

              <div className='mt-5 flex justify-between items-center'>
                <div className='mx-4 w-10'>
                  {(number as number) + 1}/{problems.length}
                </div>
                <div className='w-fit'>
                  <button
                    onClick={runCode}
                    className='border border-teal-600 rounded-md px-4 py-2 hover:bg-teal-600 hover:text-white'
                  >
                    Test solution
                  </button>
                </div>
                <div className='ml-4 mr-10 w-10'>
                  {solved && (
                    <button
                      onClick={handleNext}
                      className='border border-teal-600 rounded-md px-4 py-2 hover:bg-teal-600 hover:text-white'
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <CodeInsights problems={problems} score={score} />
        )}
      </div>
    </>
  );
}

export default Coding;
