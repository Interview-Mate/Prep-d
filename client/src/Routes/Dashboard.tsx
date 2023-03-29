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
        <div className="dashboard-elements">
          <ProblemList dashboard={true} />
        </div>
        <div className="dashboard-elements">
          <Link to="/interview">
            <img
              className="dashboard-image"
              src={Interview}
              alt="Remote interview"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
