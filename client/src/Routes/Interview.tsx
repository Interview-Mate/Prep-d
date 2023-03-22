import { useContext } from "react";
import { Context } from "../Context";

export default function LiveInterview() {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  return (
    <>
      <div>Here you can be live interviewed by a bot</div>
    </>
  );
}
