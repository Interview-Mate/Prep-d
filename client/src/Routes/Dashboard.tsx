import Navbar from "../Components/Navbar";
import Coding from "../Assets/CodingChallengeMock.png";
import Interview from "../Assets/InterviewMock.JPG";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <a href="/codingtest">
          <img className="dashboard-image" src={Coding}></img>
        </a>
        <a href="/interview">
          <img className="dashboard-image" src={Interview}></img>
        </a>
      </div>
    </>
  );
}
