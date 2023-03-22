import { useContext } from "react";
import { Context } from "../Context";

export default function Insights() {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  return (
    <>
      <div>
        Here you'll find insights such as the number of interviews taken and
        your average score etc
      </div>
    </>
  );
}
