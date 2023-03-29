import Interview from "../Assets/InterviewMock.JPG";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProblemList from "../Components/Coding/ProblemList";

export default function Dashboard() {
  return (
    <div className="h-screen w-screen ">
      <Navbar />
      <h2 className="text-center text-xl mb-5 mt-20 font-bold">
        Welcome to Prep'd!
      </h2>
      <div className="dashboard-container">
        <div className='justify-center'>
          <div className="dashboard-elements">
            <ProblemList dashboard={true} />
          </div>
            {/* <button className='mt-10 w-full py-2 px-4 bg-dark-cyan text-black font-bold text-black hover:bg-african-violet-900 hover:text-seasalt rounded-md px-3 py-2 text-base font-medium'>
             Test your skills in Code
            </button> */}
        </div>

        <div className='justify-center'>
          <div className="dashboard-elements">

            <Link to="/interview">
              <img
                className="dashboard-image"
                src={Interview}
                alt="Remote interview"
              ></img>
            </Link>
              <Link to="/interview">
                <button className='mt-5 w-full py-2 px-4 bg-dark-cyan text-black font-bold text-black hover:bg-african-violet-900 hover:text-seasalt rounded-md px-3 py-2 text-base font-medium'>
                Start an Interview
                </button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
