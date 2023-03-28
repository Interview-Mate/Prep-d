import Interview from "../Assets/InterviewMock.JPG";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProblemList from "./Coding/ProblemList";

export default function Dashboard() {
  return (
    <div className="h-screen w-screen ">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-subtitles">Train your coding skills</div>
        <div className="dashboard-subtitles">Practice live interviewing</div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-elements">
          <ProblemList dashboard={true} />
        </div>
        <div className="dashboard-elements">
          <Link to="/interview">
            <img className="dashboard-image" src={Interview}></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
