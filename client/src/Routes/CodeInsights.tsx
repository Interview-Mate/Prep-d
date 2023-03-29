/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
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
import { getSolvedProblems, getAllSolvedProblems } from '../Util/ApiService';
import { prettifyTime } from '../Util/CodeEditorHelpers';
import { useContext } from 'react';
import { Context } from '../Context';
import { Card } from 'flowbite-react';

const level: Dict = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
};

const CodeInsights = () => {
  const [solvedProblems, setSolvedProblems] = useState<SolvedProblem[]>([]);
  const [allSolvedProblems, setAllSolvedProblems] = useState<SolvedProblem[]>(
    []
  );
  const [usersAverageSolveTime, setUsersAverageSolveTime] = useState<
    number | undefined
  >();
  const [allAverageSolveTimes, setAllAverageSolveTimes] = useState<
    number | undefined
  >();
  const { currentUser } = useContext(Context) as any;

  useEffect(() => {
    const fetchData = async () => {
      const receivedUsersSolvedProblems = await getSolvedProblems(
        currentUser.id
      );
      setSolvedProblems(receivedUsersSolvedProblems);

      const receivedAllSolvedProblems = await getAllSolvedProblems();
      setAllSolvedProblems(receivedAllSolvedProblems);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!allSolvedProblems.length) return;

    setUsersAverageSolveTime(
      solvedProblems.reduce((acc, curr) => acc + curr.solveTime, 0) /
        solvedProblems.length
    );

    setAllAverageSolveTimes(
      allSolvedProblems.reduce((acc, curr) => acc + curr.solveTime, 0) /
        allSolvedProblems.length
    );
    console.log(usersAverageSolveTime, allAverageSolveTimes);
  }, [allSolvedProblems]);

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

  const labels = solvedProblems.map((problem, i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        label: 'Level',
        data: solvedProblems.map((problem) => problem.exercise?.level),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Solve time',
        data: solvedProblems.map((problem) => problem.solveTime / 1000),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className='w-1/2 h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black text-sm'>
      <div className='w-full h-full p-10 space-y-8 bg-white rounded-lg shadow '>
        <h2 className='text-center text-xl mb-5 font-bold'>Coding Insights</h2>
        {solvedProblems.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-lg font-bold'>
              You have not solved any problems yet
            </h1>
            <h2 className='text-lg mt-2'>
              Do a coding challenge to see your progress
            </h2>
          </div>
        )}
        {solvedProblems.length !== 0 && usersAverageSolveTime !== 0 && (
          <div className='flex flex-col h-full'>
            <div className='flex flex-row'>
              <Card>
                <h2 className='font-bold'>Challenges</h2>
                <h3 className='font-bold text-red-500'>{solvedProblems.length}</h3>
              </Card>

              <Card>
                <h2 className='font-bold'>Score</h2>

                <h3 className='font-bold text-red-500'>
                  {solvedProblems.reduce(
                    (acc, curr) => acc + curr.exercise!.level,
                    0
                  ) * 100}
                </h3>
              </Card>
              <Card>
                <h2 className='font-bold'>Level </h2>
                <h3 className='font-bold text-red-500'>
                  {
                    level[
                      Math.round(
                        solvedProblems.reduce(
                          (acc, curr) => acc + curr.exercise!.level,
                          0
                        ) / solvedProblems.length
                      )
                    ]
                  }
                </h3>
              </Card>
              <Card>
                {' '}
                <h2 className='font-bold'>Average Solve Time</h2>
                {usersAverageSolveTime && (
                  <h3 className='font-bold text-red-500'>
                    {prettifyTime(usersAverageSolveTime)}
                  </h3>
                )}
              </Card>
              <Card>
                {usersAverageSolveTime && allAverageSolveTimes && (
                  <h3 className='font-bold'>
                    {usersAverageSolveTime < allAverageSolveTimes ? (
                      <span className='text-green-500'>
                        {prettifyTime(
                          allAverageSolveTimes - usersAverageSolveTime
                        )}{' '}
                        faster
                      </span>
                    ) : (
                      <span className='text-red-500'>
                        {prettifyTime(
                          usersAverageSolveTime - allAverageSolveTimes
                        )}{' '}
                        slower
                      </span>
                    )}{' '}
                    than the average
                  </h3>
                )}
              </Card>
            </div>
            <div className='w-full h-full mt-5'>
              <Line options={options} data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeInsights;
