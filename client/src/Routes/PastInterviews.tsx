import { useState, useEffect } from "react";
import * as ApiService from "../Util/ApiService";
import { useContext } from "react";
import { Context } from "../Context";
import Navbar from "../Components/Navbar";

export default function PastInterviews() {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  const [pastInterviews, setPastInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      console.log(currentUser.email);
      const interviews = await ApiService.getInterviews(
        currentUser.email as string
      );
      setPastInterviews(interviews);
    };
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-seasalt">
        <Navbar />
        Here you can listen to recordings and read transcripts of past
        interviews
        {pastInterviews
          ? pastInterviews.map((interview) => <li>{interview}</li>)
          : null}
      </div>
    </>
  );
}
