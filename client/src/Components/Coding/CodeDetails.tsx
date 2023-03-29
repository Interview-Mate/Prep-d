import { useState } from 'react';
import { prettifyTime } from '../../Util/CodeEditorHelpers';

const CodeDetails = ({
  problem,
  score,
  tests,
  solved,
  error,
  runtime,
  solveTime,
}: {
  problem: Problem;
  score: number;
  tests: number;
  solved: boolean | string;
  error: string;
  runtime: number;
  solveTime: number;
}) => {
  const [toggleHint, setToggleHint] = useState<boolean>(false);

  const level: Dict = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert',
  };

  const handleHint = () => {
    setToggleHint(!toggleHint);
  };

  return (
    <div className='mr-8 p-6 h-full w-full space-y-6 bg-white rounded-lg shadow text-sm'>
      <div className='text-right'>
        Score: <span className='font-bold'>{score}</span>
      </div>
      <h2 className='text-xl font-bold'>{problem.name}</h2>
      <h3>{problem.description}</h3>
      <p>
        Level: <span className='font-bold'>{level[problem.level]}</span>
      </p>

      <p
        onClick={handleHint}
        className='italic text-sm cursor-pointer hover:font-bold'
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
          <br />
          <h4> Incorrect solution! </h4>
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
  );
};

export default CodeDetails;
