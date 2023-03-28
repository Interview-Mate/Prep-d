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
        if(typeof interviews !== 'string'){
          setPastInterviews(interviews);
        }
      } catch (err) {
        console.log("Error occured when fetching interviews");
      }
    })();
  }, []);

  return (
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
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='mt-5 p-6 w-fit h-full  space-y-6 bg-white rounded-lg shadow flex flex-col items-center justify-center '>
          <h1 className='text-lg font-bold'>
            You have not done any interviews yet
          </h1>
          <h2 className='text-lg mt-2'>
            Complete an interview to see your feedback
          </h2>
          </div>
        </div>
      )}
    </div>
  );
}
