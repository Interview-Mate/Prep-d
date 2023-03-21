import { LockClosedIcon } from "@heroicons/react/20/solid";
import Interview from "../Assets/InterviewMock.JPG";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <h1 className="app-title">InterviewMate</h1>
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
    </>
  );
}

{
  /* <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md bg-african-violet-900 py-2 px-3 text-sm font-semibold text-white hover:bg-african-violet-400 hover:text-eerie-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={handleClick}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-african-violet-400 "
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div> */
}
