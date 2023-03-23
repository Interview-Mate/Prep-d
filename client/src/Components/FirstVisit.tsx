import { useContext } from "react";
import { Context } from "../Context";

export default function FirstVisit() {
  const { handleCreateUser, user } = useContext(Context) as any;

  const handleSubmit = (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const newUser = { ...formJson, email: user.email };
    console.log(newUser);
    handleCreateUser(newUser);
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
              Please tell us a bit about yourself
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div className=" ">
                <label htmlFor="first-name" className="signup-label">
                  First name
                </label>
                <input
                  id="first-name"
                  name="name"
                  autoComplete="firstname"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="signup-label">
                  Last name
                </label>
                <input
                  id="last-name"
                  name="surname"
                  autoComplete="lastname"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  placeholder="Last name"
                />
              </div>
              <div>
                <label htmlFor="level" className="signup-label">
                  Skill level
                </label>
                <select
                  id="level"
                  name="level"
                  autoComplete="level"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                >
                  <option value="frontend">Junior</option>
                  <option value="backend">Senior</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get me going
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
