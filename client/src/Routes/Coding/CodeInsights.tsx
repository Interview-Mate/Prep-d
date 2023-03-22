import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const CodeInsights = ({
  problems,
  score,
}: {
  problems: Problem[];
  score: number;
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your progress',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Level',
        data: [15, 13, 27, 33, 48, 55, 70],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Solve time',
        data: [50, 30, 46, 23, 38, 21, 25],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <h1 className='text-2xl text-center text-pink-500 font-bold'>Insights</h1>
      <div
        className='border border-teal-600 rounded-md mt-5 p-4 h-4/5 min-h-max w-full flex flex-col'
        style={{ background: 'rgba(252, 252, 252, 1)' }}
      >
        <div className='flex flex-row items-center justify-center h-full'>
          <div className='flex flex-col items-center justify-center w-1/4'>
            <h2 className='text-sm '>Completed challenges:</h2>
            <h3 className='text-sm font-bold'>{problems.length}</h3>
            <h2 className='text-sm mt-5'>Score:</h2>
            <h3 className='text-sm font-bold'>{score}</h3>
            <h2 className='text-sm mt-5'>Average runtime:</h2>
            {/* <h3 className='text-sm font-bold'>{runtime ? runtime : '0'}ms</h3> */}
            <h2 className='text-sm mt-5'>Your level: </h2>
            <h3 className='text-sm font-bold'>
              {/* {difficulty[Math.round(score / problems.length)]} */}
              Beginner
            </h3>
            <h2 className='text-sm mt-5'>
              Your solve time compared to the average:
            </h2>
          </div>
          <div className='flex flex-row items-center justify-center  h-full w-2/4 m-5'>
            {/* <p className='w-1/2'><Line options={options} data={data}  /></p> */}
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeInsights;
