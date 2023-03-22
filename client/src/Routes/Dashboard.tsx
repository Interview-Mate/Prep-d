import Navbar from "../Components/Navbar";
import Coding from "../Assets/CodingChallengeMock.png";
import Interview from "../Assets/InterviewMock.JPG";
import { useContext } from "react";
import { Context } from "../Context";
// import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

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

        {isAuthenticated &&
          currentUser.email === "" &&
          console.log("empty string?")}
      </div>
    </>
  );
}
