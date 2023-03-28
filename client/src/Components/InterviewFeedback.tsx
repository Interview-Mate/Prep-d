import React from "react";

interface InterviewFeedback {
  rating: number;
  feedback: string;
  suggestions: string;
}

function InterviewFeedback(interviewFeedback: InterviewFeedback) {
  const { rating, feedback, suggestions } = interviewFeedback;

  return (
    <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-black text-sm'>
      <div className='w-fit	  p-10 space-y-8 bg-white rounded-lg shadow '>
        <h1 className='text-center text-xl mb-5 font-bold tracking-tight'>Feedback and Suggestions</h1>
        <p><span className='font-bold'>Overall Rating of the Interview: </span>{rating} out of 5.</p>
        <p><span className='font-bold'>Feedback: </span>{feedback}</p>
        <p><span className='font-bold'>Suggestions: </span>{suggestions}</p>
      </div>
    </div>
  );
}

export default InterviewFeedback;
