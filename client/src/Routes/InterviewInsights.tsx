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
import { Rating } from 'flowbite-react';

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
  const [averageRating, setAverageRating] = useState<number>();
  const [averageOverall, setAverageOverall] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      let interviews = await getInterviews(currentUser.id);
      if (typeof interviews !== 'string') {
        // filter all the interviews where interview.conversation length is 2 or less

        interviews = interviews.filter(
          (interview: { conversation: any[] }) =>
            interview.conversation.length > 2
        );
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
          const avg = Math.round(
            filteredRatings.reduce((acc, curr) => acc + curr, 0) /
              filteredRatings.length
          );
          setAverageRating(avg);
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
          const avgOverall = Math.round(
            overallRatings.reduce((acc, curr) => acc + curr, 0) /
              overallRatings.length
          );
          setAverageOverall(avgOverall);
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
        borderColor: '#c98bb9ff',
        backgroundColor: '#c98bb9ff',
      },
      {
        label: 'Overall rating',
        data: overallRatings,
        borderColor: '#4fbbbd',
        backgroundColor: '#4fbbbd',
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
          <div className='flex flex-col h-full'>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-col items-center justify-center'>
                <h2 className='font-bold'>Interviews</h2>
                <h3 className='font-bold text-dark-cyan'>
                  {interviews.length}
                </h3>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h2 className='font-bold'>Average Answer Rating</h2>
                {averageRating && (
                  <Rating>
                    {averageRating >= 1 ? (
                      <Rating.Star
                        filled={averageRating >= 1}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageRating >= 1} />
                    )}
                    {averageRating >= 2 ? (
                      <Rating.Star
                        filled={averageRating >= 2}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageRating >= 2} />
                    )}
                    {averageRating >= 3 ? (
                      <Rating.Star
                        filled={averageRating >= 3}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageRating >= 3} />
                    )}
                    {averageRating >= 4 ? (
                      <Rating.Star
                        filled={averageRating >= 4}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageRating >= 4} />
                    )}
                    {averageRating >= 5 ? (
                      <Rating.Star
                        filled={averageRating >= 5}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageRating >= 5} />
                    )}
                  </Rating>
                )}
              </div>
              <div className='flex flex-col items-center justify-center'>
                <h2 className='font-bold'>Average Overall Rating</h2>
                {averageOverall && (
                  <Rating>
                    {averageOverall >= 1 ? (
                      <Rating.Star
                        filled={averageOverall >= 1}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageOverall >= 1} />
                    )}
                    {averageOverall >= 2 ? (
                      <Rating.Star
                        filled={averageOverall >= 2}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageOverall >= 2} />
                    )}
                    {averageOverall >= 3 ? (
                      <Rating.Star
                        filled={averageOverall >= 3}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageOverall >= 3} />
                    )}
                    {averageOverall >= 4 ? (
                      <Rating.Star
                        filled={averageOverall >= 4}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageOverall >= 4} />
                    )}
                    {averageOverall >= 5 ? (
                      <Rating.Star
                        filled={averageOverall >= 5}
                        color={'#4fbbbd'}
                      />
                    ) : (
                      <Rating.Star filled={averageOverall >= 5} />
                    )}
                  </Rating>
                )}
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className='w-full h-full '>
              <Line options={options} data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewInsights;
