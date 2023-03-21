import { LockClosedIcon } from "@heroicons/react/20/solid";
import Interview from "../Assets/InterviewMock.JPG";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log({ isAuthenticated });

  return (
    <>
      <h1 className="app-title">InterviewMate</h1>
      {!isAuthenticated && (
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
      )}
    </>
  );
}
