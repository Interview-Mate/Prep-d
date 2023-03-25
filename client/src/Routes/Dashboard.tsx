
import Interview from '../Assets/InterviewMock.JPG';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import ProblemList from './Coding/ProblemList';

export default function Dashboard() {
  return (
    <div className='h-screen w-screen bg-seasalt'>
      <Navbar />
      <div className='dashboard-container'>
        <div >
          <ProblemList alignment={'right'} />
        </div>
        <div className='h-max min-h-max flex flex-col flex: 1'>
          <Link to='/interview'>
            <img className='dashboard-image' src={Interview}></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
