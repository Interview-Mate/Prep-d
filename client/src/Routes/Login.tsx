import { LockClosedIcon } from "@heroicons/react/20/solid";
// import triallogo from "../TrialLogo.JPG";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/dashboard");
  }

  return (
    <>
      {/*
        This Login requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img className="mx-auto h-20 w-auto" src="" alt="Your Company" /> */}
            <h1 className="app-title">InterviewMate</h1>
            <h2 className="mt-20 text-center text-3xl font-bold tracking-tight text-dark-cyan">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 bg-seasalt text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-african-violet-900 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 bg-seasalt text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-african-violet-900 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-african-violet-900 "
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-seasalt"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/register"
                  className="font-medium text-african-violet-900 hover:text-african-violet-400"
                >
                  Don't have an account yet? Sign up here!
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-african-violet-900 py-2 px-3 text-sm font-semibold text-white hover:bg-african-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={handleClick}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-african-violet-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
