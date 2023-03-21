import { useState } from 'react';
import { intervalToDuration } from 'date-fns';

const ProblemCard = ({
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

  const prettifyTime = (time: number) => {
    const duration = intervalToDuration({ start: 0, end: time });
    return duration.hours === 0
      ? duration.minutes === 0
        ? `${duration.seconds}s`
        : `${duration.minutes}m ${duration.seconds}s`
      : `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
  };

  return (
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
          <p className='text-sm'>Solve time: {prettifyTime(solveTime)}</p>
        </div>
      )}
    </div>
  );
};

export default ProblemCard;
