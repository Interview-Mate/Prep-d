import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Interview from '../Assets/InterviewMock.JPG';
import { Link } from 'react-router-dom';
import { getProblems } from '../Util/ApiService';


export default function Dashboard() {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const receivedProblems = await getProblems();
      // const user = await apiService.getUser();
      // setUser(user);


      setProblems(receivedProblems);
    };

    fetchData();
  }, []);

  const level: Dict = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert',
  };

  const lang: Dict = {
    javascript: 'JS',
  };

  return (
    <>
      <Navbar />
      <div className='dashboard-container flex flex-row h-screen w-screen p-20'>
        <div className='flex flex-col mt-10 mr-10'>
          <div className='text-right border border-teal-600 rounded-md  p-4 h-max min-h-max w-full flex flex-col bg-white'>
            <Link
              to={'/codingtest/level/' + 'beginner'}
              className='hover:opacity-50 active:opacity-75'
            >
              Work on <span className='font-bold'>beginner</span> challenges
            </Link>
            <Link
              to={'/codingtest/level/' + 'intermediate'}
              className='hover:opacity-50 active:opacity-75'
            >
              Work on <span className='font-bold'>intermediate</span> challenges
            </Link>
            <Link
              to={'/codingtest/level/' + 'advanced'}
              className='hover:opacity-50 active:opacity-75'
            >
              Work on <span className='font-bold'>advanced</span> challenges
            </Link>
            <Link
              to={'/codingtest/level/' + 'expert'}
              className='hover:opacity-50 active:opacity-75'
            >
              Work on <span className='font-bold'>expert</span> challenges
            </Link>
            <Link
              to={'/codingtest/level/' + 'all'}
              className='hover:opacity-50 active:opacity-75'
            >
              Work on <span className='font-bold'>all</span> challenges
            </Link>
          </div>
          <div className='border border-teal-600 rounded-md mr-8 p-4 h-max min-h-max w-full flex flex-col bg-white'>
            {problems.map((problem) => (
              <Link
                to={'/codingtest/' + problem.name}
                key={problem.name}
                className='text-right hover:opacity-50 active:opacity-75'
              >
                {problem.name}{' '}
                <span className='border border-teal-600 rounded-sm text-xs pl-0.5 pr-0.5'>
                  {level[problem.level]}
                </span>{' '}
                <span className='border border-teal-600 rounded-sm text-xs pl-0.5 pr-0.5'>
                  {lang[problem.language]}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className='mr-8 p-4 h-max min-h-max w-1/2 flex flex-col'>
          <a href='/interview'>
            <img className='dashboard-image' src={Interview}></img>
          </a>
        </div>
      </div>
    </>
  );
}
