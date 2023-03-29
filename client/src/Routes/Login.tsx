import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useContext } from "react";
import { Context } from "../Context";
import Login3D from "./Login3D";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  const { isAuthenticated, handleGetUser } = useContext(Context) as any;

  useEffect(() => {
    if (isAuthenticated) {
      handleGetUser();
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex z-0 login-container overflow-hidden justify-end">
        <div className="w-full h-full z-10 flex justify-center items-center">
          <Login3D />
          {!isAuthenticated && (
            <div className="mr-20 flex flex-col justify-center items-center h-full rounded-lg w-1/4 bg-seasalt">
              <div className="py-10 border px-10 rounded-lg drop-shadow-lg z-50">
                <div className="pb-10 mt-6 text-center text-eerie-black">
                  <p className="mb-6">
                    Are you ready to crush your next interview and show HR who's
                    the boss?
                  </p>
                  <h2 className="text-center text-xl font-bold">
                    Let's get you Prep'd!
                  </h2>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="w-fit py-2 px-4 bg-dark-cyan text-black font-bold text-black hover:bg-african-violet-900 hover:text-seasalt rounded-md px-3 py-2 text-base font-medium"
                    onClick={() => loginWithRedirect()}
                  >
                    Log in/Sign up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
