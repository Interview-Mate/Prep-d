import Navbar from "../Components/Navbar";
import Coding from "../Assets/CodingChallengeMock.png";
import Interview from "../Assets/InterviewMock.JPG";
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  const { user } = useAuth0();
  console.log({ user });
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
