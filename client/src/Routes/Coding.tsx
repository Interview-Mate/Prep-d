import { useContext } from "react";
import { Context } from "../Context";

export default function CodingInterview() {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  return (
    <>
      <div>Here you can do coding challenges</div>
    </>
  );
}
