import Interview from '../Assets/InterviewMock.JPG';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import ProblemList from '../Components/Coding/ProblemList';
import Button from '../Components/Button';

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
        </div>

        <div className='dashboard-elements '>
          <Link to='/interview'>
            <img
              className='dashboard-image rounded-lg shadow'
              src={Interview}
              alt='Remote interview'
            />
          </Link>
          <div className='flex flex-col items-center justify-center mt-5'>
            <Link to='/interview'>
              <Button>Start an Interview</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
