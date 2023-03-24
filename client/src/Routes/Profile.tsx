import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { Context } from "../Context";
import Navbar from "../Components/Navbar";

export default function Profile() {
  //do we need to user current user or user from auth0 here
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="h-screen w-full bg-seasalt">
        <Navbar />
        {user && (
          <div className="profile-container">
            <div className="profile-head">
              <img src={user.picture} alt={user.name} className="profile-pic" />
              <div className="profile-title">Hi, {currentUser.name}!</div>
            </div>
            <h2>{user.name}</h2>

            <div className="profile-element">
              <label htmlFor="level">Your level of experience</label>
              <select
                id="level"
                name="level"
                autoComplete="level"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
