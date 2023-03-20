import React from 'react';

const CodeInsights = ({
  problems,
  score,
}: {
  problems: Problem[];
  score: number;
}) => {
  return (
    <div>
      <>
        <h1 className='text-2xl text-center text-pink-500 font-bold'>
          Congratulations! <br />
          You completed all challenges!
        </h1>
        <div
          className='border border-teal-600 rounded-md mt-10 p-4 h-1/2 min-h-max w-full flex flex-col'
          style={{ backgroundColor: 'rgba(252, 252, 252, 1)' }}
        >
          <h2 className='text-sm '>Completed challenges:</h2>
          <h3 className='text-sm font-bold'>{problems.length}</h3>

          <h2 className='text-sm mt-5'>Score:</h2>
          <h3 className='text-sm font-bold'>{score}</h3>

          <h2 className='text-sm mt-5'>Average runtime:</h2>
          {/* <h3 className='text-sm font-bold'>{runtime ? runtime : '0'}ms</h3> */}

          <h2 className='text-sm mt-5'>Your level:</h2>
          {/* <h3 className='text-sm font-bold'>
            {difficulty[Math.round(score / problems.length)]}
          </h3> */}

          <h2 className='text-sm mt-5'>
            Your solve time compared to the average:
          </h2>
        </div>
      </>
    </div>
  );
};

export default CodeInsights;
