import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { Context } from "../Context";
import Navbar from "../Components/Navbar";

export default function Profile() {
  //do we need to user current user or user from auth0 here
  const { currentUser } = useContext(Context) as any;
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <div>
        <Navbar />
        {currentUser && (
          <div className="profile-container">
            <div className="profile-title">Hi, {currentUser.name}!</div>
            <img src={currentUser.image} alt={currentUser.name} />
          </div>
        )}
      </div>
  );
}
