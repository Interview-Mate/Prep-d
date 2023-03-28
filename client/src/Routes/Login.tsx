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
              <div className="hover:bg-white py-8 border px-8 rounded-lg drop-shadow-lg z-50">
                <div className="pb-10 underline-offset-8 text-2xl font-bold mt-4 text-eerie-black text-center">
                  <p> Let's get Prep'd </p>
                </div>
                <div className="pb-20 mt-6 text-center text-eerie-black">
                  <p>
                    Are you ready to crush your next interview and show those HR
                    folks who's the boss?
                  </p>
                </div>
                <div className="flex justify-center hover:text-african-violet-400 w-full border-2 border-white bg-african-violet-900 rounded-lg drop-shadow-xl">
                  <button
                    className="font-bold py-2 px-4 rounded mt-4"
                    onClick={() => loginWithRedirect()}
                  >
                    <div className="z-20">
                      <LockClosedIcon aria-hidden="true" />
                      Sign in
                    </div>
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
