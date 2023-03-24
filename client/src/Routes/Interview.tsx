import { useContext } from 'react';
import { Context } from '../Context';
import Navbar from '../Components/Navbar';
import React, { useState } from "react";
import * as ApiService from "../Util/ApiService";
import InterviewForm from "../Components/InterviewForm";
import Interviewer from "../Components/Interviewer";
import SpeechToText from "../Components/SpeechToText";
import UserWebCam from '../Components/Interview/UserWebCam'
import AvatarWebCam from '../Components/Interview/AvatarWebCam';

export default function Interview() {

  // animation setting 

  
  const [onceAccepted, setOnceAccepted] = useState(false);

  const handleAccept = () => {
    setOnceAccepted(true);
  }

  
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  const [formValues, setFormValues] = useState<InterviewFormValues>({
    jobLevel: "senior",
    companyName: "Codeworks",
    jobField: "software development",
    jobTitle: "senior developer",
  });
  const [showInterviewForm, setShowInterviewForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [interviewId, setInterviewId] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [interviewData, setInterviewData] = useState<Array<{ question: string; answer: { audioUrl: string; transcript: string } }>>([]);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [userAnswer, setUserAnswer] = useState<{ audioUrl: string; transcript: string } | null>(
    null
  );

  const newInterview = async () => {
    const res = await ApiService.createInterview(
      currentUser.id,
      formValues.jobLevel,
      formValues.companyName,
      formValues.jobField,
      formValues.jobTitle
    );
    if (res.error) {
      console.log(res.error);
    } else {
      setInterviewId(res._id);
      await getFirstQuestion(res._id);
    }
  };

  const getFirstQuestion = async (id: string) => {
    const res = await ApiService.retrieveFirstQuestion({
      id: id,
      role: "system",
      content: `You are an interviewer, interviewing someone for a job at ${formValues.companyName}. It is for a ${formValues.jobLevel} position in the field of ${formValues.jobField}. Begin by asking an introductory question.`,
    });
    if (res.error) {
      console.log(res.error);
    } else {
      setQuestion(res);
    }
  };

  const getAnotherQuestion = async () => {
    const res = await ApiService.retrieveAnotherQuestion({
      interviewId: interviewId,
      role: "system",
      content: `You are an interviewer, interviewing someone for a job at ${formValues.companyName}. It is for a ${formValues.jobLevel} position in the field of ${formValues.jobField}. Begin by asking an introductory question.`,
    });
    if (res.error) {
      console.log(res.error);
    } else {
      setQuestion(res);
    }
  };

  const handleFormSubmit = async (values: InterviewFormValues) => {
    // setFormValues(values);
    setFormSubmitted(true);
    setShowInterviewForm(false);
    await newInterview();
  };

  const saveUserResponse = async (audioUrl: string, transcript: string) => {
      const res = await ApiService.updateInterview(
        interviewId,
        audioUrl,
        transcript,
      );
      if (res.error) {
        console.log(res.error);
      } else {
        // setInterviewData((prevData) => [...prevData, { question, answer: userAnswer }]);
        if (questionCount < 7) {
          setQuestionCount((count) => count + 1);
          setQuestion(res);
          // getAnotherQuestion();
        }
      }
    };

  return (
    <>


      <div className='h-screen w-screen bg-seasalt'>
        <Navbar />




        {showInterviewForm && <InterviewForm onFormSubmit={handleFormSubmit} />}
              {formSubmitted && (
        <>
          <div className ='flex flex-col items-center justify-center w-full pt-20'>
            <div className = 'flex justify-center space-x-1'>

                <UserWebCam/>
                <AvatarWebCam/>

            </div>
          </div>
          <Interviewer
            message={question}
            setIsInterviewerSpeaking={setIsInterviewerSpeaking}
          />
          <SpeechToText
            isInterviewerSpeaking={isInterviewerSpeaking}
            onSaveUserResponse={(audioUrl: any, transcript: any) => saveUserResponse(audioUrl, transcript)}
          />
        </>
      )}
      </div>


    </>
  )
}

// <div className ='flex flex-col items-center justify-center w-full pt-20'>
        
// {onceAccepted ? (
// <div className = 'flex justify-center space-x-1'>

//     <UserWebCam/>
//     <AvatarWebCam/>

// </div>
// ) : (
//     <div className= 'h-96 m-20'>
//       <button onClick={handleAccept} className='bg-white text-black rounded-lg px-4 py-2'>
//         Start Interview
//       </button>
//     </div>
// )}

// <div className = 'flex justify-end gap-5 pt-10'>
// </div>
// </div>
