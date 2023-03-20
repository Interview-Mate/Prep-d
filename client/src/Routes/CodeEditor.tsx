import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import {
  SandpackCodeViewer,
  SandpackLayout,
  SandpackProvider,
  SandpackPreview,
  // SandpackSetup,
} from '@codesandbox/sandpack-react';
import { intervalToDuration } from 'date-fns';
import { run } from '../utils/safeEval';
import CodeInsights from './CodeEditor/CodeInsights';

import {
  problem1,
  problem2,
  // problem3,
  // problem4,
  // problem5,
  // problem6,
  // problem7,
} from './CodeEditor/problems';

function CodeEditor() {
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
    // Change problem when number changes
    if ((number as number) < problems.length) {
      setError('');
      setSolved('');
      setRuntime(0);
      setSolveTime(performance.now());
      setProblem(problems[number as number]);
      setUserInput(problem?.function);
    }
  }, [number]);

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

  const runCode = async () => {
    setTests(0);
    const startTime1 = performance.now();
    const result1 = run(userInput + problem?.solution1[0]);
    const endTime1 = performance.now();

    const startTime2 = performance.now();
    const result2 = run(userInput + problem?.solution2[0]);
    const endTime2 = performance.now();

    const averageTime = (endTime1 - startTime1 + (endTime2 - startTime2)) / 2;
    console.log(result1.output, result2.output)
    if (result1.output === problem?.solution1[1])
      setTests((prevTests) => prevTests + 1);
    if (result2.output === problem?.solution2[1])
      setTests((prevTests) => prevTests + 1);
    if (
      result1.output === problem?.solution1[1] &&
      result2.output === problem?.solution2[1]
    ) {
      const endTime = performance.now();
      setSolveTime(endTime - solveTime);
      setRuntime(averageTime);
      if (!solved) setScore((prevScore: number) => prevScore + 100);
      setSolved(true);
      setError('');
    } else if (result1.error !== '') {
      if (solved) setScore((prevScore: number) => prevScore - 100);
      setError(result1.error);
      setSolved(false);
    } else {
      if (solved) setScore((prevScore: number) => prevScore - 100);
      setSolved(false);
    }
  };

  const prettifyTime = (time: number) => {
    const duration = intervalToDuration({ start: 0, end: time as number });
    if (duration.hours === 0 && duration.minutes === 0)
      return `${duration.seconds}s`;
    else if (duration.hours === 0)
      return `${duration.minutes}m ${duration.seconds}s`;
    else return `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
  };

  const handleChange = (input: any) => {
    setUserInput(input);
  };

  return (
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
                <p>Tests passed: {tests}/2</p>
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
                <p className='text-sm'>Solve time: {prettifyTime(solveTime)}</p>
              </div>
            )}
          </div>

          <div className='mx-4 text-center w-3/4'>
            <SandpackProvider template='test-ts'>
              <SandpackLayout
                className='border border-teal-600 rounded-md'
                style={{ borderColor: '#548687ff' }}
              >
                <Editor
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
                {/* <SandpackPreview /> */}
              </SandpackLayout>
            </SandpackProvider>

            <div className='mt-5 flex justify-between items-center'>
              <div className='mx-4 w-10'>
                {(number as number) + 1}/{problems.length}
              </div>
              <div className='mr-10 w-fit'>
                <button
                  onClick={runCode}
                  className='border border-teal-600 rounded-md px-4 py-2 hover:bg-teal-600 hover:text-white'
                >
                  Test solution
                </button>
              </div>
              <div className='mx-10 w-10'>
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
  );
}

export default CodeEditor;
