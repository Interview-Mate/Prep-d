import { useState, useEffect } from "react";
import * as ApiService from "../Util/ApiService";
import { useContext } from "react";
import { Context } from "../Context";
import Navbar from "../Components/Navbar";
import PastInterview from "../Components/PastInterview";

export default function PastInterviews() {
  const { currentUser } = useContext(Context) as any;
  const [pastInterviews, setPastInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const interviews = await ApiService.getInterviews(
          currentUser.id as string
        );
        console.log(interviews);
        setPastInterviews(interviews);
      } catch (err) {
        console.log("Error occured when fetching interviews");
      }
    })();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        {pastInterviews.length > 0 ? (
          // (
          //   expandedID && expandedInterview ? (
          //     <PastInterview
          //       key={expandedID}
          //       interview={expandedInterview}
          //       expandInterview={expandInterview}
          //       expanded={true}
          //     />
          //   ) :
          pastInterviews.map(
            (interview) =>
              interview.conversation.length > 2 && (
                <PastInterview
                  key={interview._id}
                  interview={interview}
                  // expandInterview={expandInterview}
                  // expand={expand}
                />
              )
          )
        ) : (
          // )
          <div>
            You have not taken any interviews yet, fancy giving it a try?
          </div>
        )}
      </div>
    </>
  );
}