import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";
import * as ApiService from "../Util/ApiService";
import { useAuth0 } from "@auth0/auth0-react";

export default function PastInterviews() {
  const { isAuthenticated, user } = useAuth0();
  console.log(user);

  const [pastInterviews, setPastInterviews] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchInterviews = async () => {
        console.log(user.email);
        const interviews = await ApiService.getInterviews(user.email as string);
        setPastInterviews(interviews);
      };
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        Here you can listen to recordings and read transcripts of past
        interviews
        {pastInterviews
          ? pastInterviews.map((interview) => <li>{interview}</li>)
          : null}
      </div>
    </>
  );
}
