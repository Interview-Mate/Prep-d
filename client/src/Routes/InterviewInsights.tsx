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
import { Card } from 'flowbite-react';

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
          const overallRatings: number[] = [];
          interviews.forEach((interview: { overall: any[] }) => {
            if (
              interview.overall.length !== 0 &&
              isJsonString(interview.overall[0])
            ) {
              overallRatings.push(
                JSON.parse(interview.overall[0]).overall_number
              );
            }
          });
          setOverallRatings(overallRatings);
        }
      }
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
      {
        label: 'Overall rating',
        data: overallRatings,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className='w-1/2 h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black text-sm'>
      <div className='w-full h-full p-10 space-y-8 bg-white rounded-lg shadow '>
        <h2 className='text-center text-xl mb-5 font-bold'>
          Interview Insights
        </h2>
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
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='flex flex-row'>
              <Card>
                <h2 className='font-bold'>Interviews</h2>
                <h3 className='font-bold text-red-500'>{interviews.length}</h3>
              </Card>
              <Card>
                <h2 className='font-bold'>Average Answer Rating</h2>
                {ratings && (
                  <h3 className='font-bold text-red-500'>
                    {Math.round(
                      ratings.reduce((acc, curr) => acc + curr, 0) /
                        ratings.length
                    )}
                  </h3>
                )}
              </Card>
              <Card>
                <h2 className='font-bold'>Average Overall Rating</h2>
                {overallRatings.length > 0 && (
                  <h3 className='font-bold text-red-500'>
                    {Math.round(
                      overallRatings.reduce((acc, curr) => acc + curr, 0) /
                        overallRatings.length
                    )}
                  </h3>
                )}
              </Card>
            </div>
            <br />
            <br />
            <div className='w-full h-full mt-5'>
              <Line options={options} data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewInsights;
