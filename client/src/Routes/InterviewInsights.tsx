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
import { getInterviews } from '../Util/ApiService';
import { useContext } from 'react';
import { Context } from '../Context';
import Navbar from '../Components/Navbar';

const level: Dict = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'Expert',
};

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const InterviewInsights = () => {
  const { currentUser } = useContext(Context) as any;
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [overallRatings, setOverallRatings] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const interviews = await getInterviews(currentUser.id);
      if (typeof interviews !== 'string') {
        setInterviews(interviews);
        let filteredRatings: number[] = [];
        if (interviews.length > 0) {
          filteredRatings = interviews.flatMap(
            (interview: { conversation: any[] }) =>
              interview.conversation
                .filter(
                  (message: { role: string }) => message.role === 'assistant'
                )
                .slice(1)
                .map((message: { content: any }) => {
                  const { content } = message;
                  return isJsonString(content)
                    ? JSON.parse(content).rating_number
                    : null;
                })
                .filter((rating: null) => rating !== null)
          );
          setRatings(filteredRatings);
          const overall = interviews.flatMap(
            (interview: { overall: any }) => interview.overall
          );
          setOverallRatings(overall);
        }
      }
      // console.log(interviews)
    };
    fetchData();
  }, []);

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

  const labels = ratings.map((rating, i) => i + 1);

  const data = {
    labels,
    datasets: [
      {
        label: 'Answer skills',
        data: ratings,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black text-sm'>
        <div className='w-fit	  p-10 space-y-8 bg-white rounded-lg shadow '>
          {interviews.length === 0 && (
            <div className='flex flex-col items-center justify-center h-full'>
              <h1 className='text-lg font-bold'>
                You have not done any interviews yet
              </h1>
              <h2 className='text-lg mt-2'>
                Complete an interview to see your feedback
              </h2>
            </div>
          )}
          {interviews.length !== 0 && ratings?.length !== 0 && (
            <div className='flex flex-row items-center justify-center h-full'>
              <div className='flex flex-col items-center justify-center w-1/4'>
                <h2 className='text-sm '>Completed interviews</h2>
                <h3 className='text-sm font-bold'>{interviews.length}</h3>
                <h2 className='text-sm mt-5'>Average answer rating</h2>
                {ratings && (
                  <h3 className='text-sm font-bold'>
                    {Math.round(
                      ratings.reduce((acc, curr) => acc + curr, 0) /
                        ratings.length
                    )}
                  </h3>
                )}
                <h2 className='text-sm mt-5'>Average overall rating</h2>
                {overallRatings && (
                  <h3 className='text-sm font-bold'>
                    {Math.round(
                      overallRatings.reduce((acc, curr) => acc + curr, 0) /
                        overallRatings.length
                    )}
                  </h3>
                )}
              </div>
              <div className='flex flex-row items-center justify-center  h-full w-2/4 m-5'>
                <Line options={options} data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewInsights;
