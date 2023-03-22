import { useContext } from "react";
import { Context } from "../Context";

export default function Settings() {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  return (
    <>
      <div>Here you'll find user info, such as email and password</div>
    </>
  );
}
