/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect, SetStateAction } from 'react';
import Editor from '@monaco-editor/react';
import Frame from 'react-frame-component';
import Sandbox from '../Components/Coding/Sandbox';
import Insights from './Insights';
import CodeFooter from '../Components/Coding/CodeFooter';
import CodeDetails from '../Components/Coding/CodeDetails';
import Navbar from '../Components/Navbar';
import { useContext } from 'react';
import { Context } from '../Context';

import {
  getProblems,
  getSolvedProblems,
  saveSolvedProblem,
} from '../Util/ApiService';
import { useParams } from 'react-router-dom';

const level: Dict = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
  all: 5,
};

function Coding() {
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
  const [safelyRunCode, setSafelyRunCode] = useState<boolean>(false);
  const [results, setResults] = useState<Result[]>([]);
  const [previousSolution, setPreviousSolution] = useState<
    string | undefined
  >();
  const { levelId, problemId } = useParams();
  const { currentUser } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      let receivedProblems = await getProblems();
      const solvedProblems = await getSolvedProblems(currentUser.id);
      setScore(
        solvedProblems.reduce(
          (acc: any, curr: any) => acc + curr.exercise!.level,
          0
        ) * 100
      );

      // filter out problems that are solved if user didn't select a specific problem
      if (problemId === undefined) {
        receivedProblems = receivedProblems.filter(
          (problem: Problem) =>
            !solvedProblems
              .map((solvedProblem: SolvedProblem) => solvedProblem.problem_id)
              .includes(problem._id)
        );
      }

      if (levelId && levelId !== 'all') {
        // filter by level
        const problemsFilteredByLevel = receivedProblems.filter(
          (problem: Problem) => problem.level === level[levelId]
        );
        setProblems(problemsFilteredByLevel);
      } else if (levelId && levelId === 'all') {
        // shuffle problems
        for (let i = receivedProblems.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [receivedProblems[i], receivedProblems[j]] = [
            receivedProblems[j],
            receivedProblems[i],
          ];
        }
        setProblems(receivedProblems);
      } else if (problemId) {
        // filter by problemId
        const problemsFilteredById = receivedProblems.filter(
          (problem: Problem) => problem._id === problemId
        );
        setProblems(problemsFilteredById);
        // set code in editor and details to previous solution if it exists
        if (
          solvedProblems
            .map((solvedProblem: SolvedProblem) => solvedProblem.problem_id)
            .includes(problemId)
        ) {
          const previousSolution = solvedProblems.filter(
            (solvedProblem: SolvedProblem) =>
              solvedProblem.problem_id === problemId
          )[0];
          setSolved(true);
          setTests(3);
          setPreviousSolution(previousSolution.solution);
          setRuntime(previousSolution.runtime);
          setSolveTime(previousSolution.solveTime);
        }
      } else setProblems(receivedProblems);

      setNumber(0);
    };
    if (currentUser) fetchData();
  }, [currentUser]);

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
    // Check if solution is correct
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
        setSolveTime(endTime - solveTime);
        setRuntime((runtime1 + runtime2 + runtime3) / 3);
        if (!solved) setScore((prevScore) => prevScore + 100 * problem!.level);
        setSolved(true);
        setError('');
      }

      if (error1 || error2 || error3) {
        if (solved) setScore((prevScore) => prevScore - 100 * problem!.level);
        if (error1) setError(error1);
        else if (error2) setError(error2);
        else if (error3) setError(error3);
        setSolved(false);
      }

      if (testsPassed < 3 && !error1 && !error2 && !error3) {
        if (solved)
          setScore((prevScore: number) => prevScore - 100 * problem!.level);
        setError('');
        setSolved(false);
      }
    }
  }, [results]);

  const handleNext = () => {
    //save solution to db
    saveSolvedProblem({
      user_id: currentUser.id,
      problem_id: problem?._id,
      solution: userInput,
      score: score,
      runtime: runtime,
      solveTime: solveTime,
    });
    setNumber((prevNumber) => (prevNumber as number) + 1);
  };

  const handleChange = (input: SetStateAction<string | undefined>) => {
    setUserInput(input);
  };

  const runCode = () => {
    setTests(0);
    setSafelyRunCode(true);
  };

  return (
    <div className='h-screen w-screen'>
      <Navbar />
      <div className='h-full w-full'>
        {problem && (number as number) < problems.length && (
          <div className='flex items-center justify-center h-full w-full'>
            <div className='w-1/4 h-full'>
              <CodeDetails
                problem={problem}
                score={score}
                tests={tests}
                solved={solved}
                error={error}
                runtime={runtime}
                solveTime={solveTime}
              />
            </div>
            <div className='p-20 m-5 w-3/4'>
              <Editor
                className='border p-0.5 pt-5 pr-2  bg-white rounded-lg shadow '
                height='65vh'
                defaultLanguage={problem.language}
                theme='vs-light'
                value={previousSolution ? previousSolution : problem.function}
                onChange={handleChange}
                options={{
                  minimap: {
                    enabled: false,
                  },
                  wordWrap: 'on',
                  tabSize: 2,
                }}
              />

              <CodeFooter
                problems={problems}
                number={number}
                runCode={runCode}
                solved={solved}
                handleNext={handleNext}
              />
            </div>
          </div>
        )}
        {number === problems.length && <Insights />}
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
      </div>
    </div>
  );
}

export default Coding;
