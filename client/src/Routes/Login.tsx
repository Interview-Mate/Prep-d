import { LockClosedIcon } from "@heroicons/react/20/solid";
import Interview from "../Assets/InterviewMock.JPG";
import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
import {
  // useState,
  useEffect,
} from "react";

export default function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  // const [authenticated, setAuthenticated] = useState(false);
  // useEffect(() => {
  //   if (isAuthenticated) setAuthenticated(true);
  // });
  console.log({ isAuthenticated });
  // const navigate = useNavigate();

  return (
    <>
      <h1 className="app-title">InterviewMate</h1>
      {/* {!isAuthenticated && (
        ? (
          navigate("/dashboard")
        ) : */}
      <div className="login-container">
        <div>
          <img className="login-image" src={Interview}></img>
        </div>
        <div className="login-button">
          <button className="login-span" onClick={() => loginWithRedirect()}>
            <div>
              <LockClosedIcon
                // className="h-5 text-african-violet-400 "
                aria-hidden="true"
              />
              Sign in
            </div>
          </button>
        </div>
      </div>
      {/* )} */}
    </>
  );
}
