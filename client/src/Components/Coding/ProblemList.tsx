import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../Context';
import { Link } from 'react-router-dom';
import { getProblems, getSolvedProblems } from '../../Util/ApiService';
import Button from '../Button';

const ProblemList = ({ dashboard }: { dashboard: boolean }) => {
  const { currentUser } = useContext(Context);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const receivedProblems = await getProblems();
      setProblems(receivedProblems);
      const solvedProblems = await getSolvedProblems(currentUser.id);
      setSolvedIds(
        solvedProblems.map(
          (solvedProblem: SolvedProblem) => solvedProblem.problem_id
        )
      );
    };
    if (currentUser) fetchData();
  }, [currentUser]);

  const level: Dict = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert',
  };

  const lang: Dict = {
    javascript: 'JS',
  };

  return dashboard ? (
    <div
      className={
        'text-center rounded-2xl text-lg p-10 flex flex-col w-full justify-center bg-white'
      }
    >
      <h2 className='text-xl mb-5 font-bold'>Coding Challenges</h2>
      <div className='mt-5'>
        <Link to={'/codingtest/level/' + 'beginner'}>
          <Button>
            Work on <span className='font-bold'>beginner</span> challenges
          </Button>
        </Link>
      </div>
      <div className='mt-5'>
        <Link to={'/codingtest/level/' + 'intermediate'}>
          <Button>
            Work on <span className='font-bold'>intermediate</span> challenges
          </Button>
        </Link>
      </div>
      <div className='mt-5'>
        <Link to={'/codingtest/level/' + 'advanced'}>
          <Button>
            Work on <span className='font-bold'>advanced</span> challenges
          </Button>
        </Link>
      </div>
      <div className='mt-5'>
        <Link to={'/codingtest/level/' + 'expert'}>
          <Button>
            Work on <span className='font-bold'>expert</span> challenges
          </Button>
        </Link>
      </div>
      <div className='mt-5'>
        <Link to={'/codingtest/level/' + 'all'}>
          <Button>
            Work on <span className='font-bold'>all</span> challenges
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black text-sm'>
      <div className='bg-white w-fit p-10 space-y-8 rounded-lg shadow'>
        <h2 className='text-center text-xl mb-5 font-bold'>
          Coding Challenges
        </h2>
        <div className='flex items-center justify-center'>
          <div
            className={'text-right rounded-2xl text-lg p-10 m-5 flex flex-col'}
          >
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
          <div
            className={
              'text-left rounded-2xl text-lg p-10 m-5  h-4/5 flex flex-col'
            }
          >
            {problems.map((problem) => (
              <Link
                to={'/codingtest/' + problem._id}
                key={problem._id}
                className='hover:opacity-50 active:opacity-75'
              >
                {problem.name}{' '}
                <span className='m-0.5 border text-black border-dark-cyan rounded-sm text-xs pl-0.5 pr-0.5'>
                  {level[problem.level]}
                </span>
                {solvedIds.includes(problem._id) && (
                  <span className='m-0.5 border border-dark-cyan rounded-sm text-xs pl-0.5 pr-0.5 bg-dark-cyan text-white'>
                    Solved
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemList;
