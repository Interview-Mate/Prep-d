import Interview from '../Assets/InterviewMock.JPG';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import ProblemList from '../Components/Coding/ProblemList';

export default function Dashboard() {
  return (
    <div className='h-screen w-screen '>
      <Navbar />
      <h1 className='text-center text-2xl mt-10 text-dark-cyan font-bold uppercase'>
        Welcome to Prep'd
      </h1>
      <div className='dashboard-container items-center  m-10'>
        <div className='justify-center'>
          <div className='dashboard-elements bg-white rounded-lg shadow '>
            <ProblemList dashboard={true} />
          </div>
          {/* <button className='mt-10 w-full py-2 px-4 bg-dark-cyan text-black font-bold text-black hover:bg-african-violet-900 hover:text-seasalt rounded-md px-3 py-2 text-base font-medium'>
             Test your skills in Code
            </button> */}
        </div>

        <div className='dashboard-elements '>
          <Link to='/interview'>
            <img
              className='dashboard-image rounded-lg shadow'
              src={Interview}
              alt='Remote interview'
            />
          </Link>
          <div className='flex flex-col items-center justify-center'>
            <Link to='/interview'>
              <button className='mt-5 shadow w-full bg-dark-cyan text-black hover:bg-african-violet-900 hover:text-seasalt rounded-md px-3 py-2 text-base font-medium'>
                Start an Interview
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
