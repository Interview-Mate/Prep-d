import { useContext, useEffect } from 'react';
import { Context } from '../Context';
import Navbar from '../Components/Navbar';
import React, { useState } from "react";
import * as ApiService from "../Util/ApiService";
import InterviewForm from "../Components/InterviewForm";
import Interviewer from "../Components/Interviewer";
import SpeechToText from "../Components/SpeechToText";
import UserWebCam from '../Components/Interview/UserWebCam'
import AvatarWebCam from '../Components/Interview/AvatarWebCam';
import { all } from 'q';

interface LoadingStatus {
  userWebCam: boolean;
  avatarWebCam: boolean;
}

export default function Interview() {

  
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
    video: true,
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

  const newInterview = async (values:any) => {
    const res = await ApiService.createInterview(
      currentUser.id,
      values.jobLevel,
      values.companyName,
      values.jobField,
      values.jobTitle,
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
    setFormValues(values);
    console.log("values: ", values)
    setFormSubmitted(true);
    setShowInterviewForm(false);
    await newInterview(values);
  };

  const saveUserResponse = async (audioUrl: string | null, transcript: string) => {
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
        // else {
        //   getFinalFeedback() - create new method for retrieing final?
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

                <UserWebCam />
                <AvatarWebCam isInterviewerSpeaking={isInterviewerSpeaking}/>

            </div>
          </div>
          
          <SpeechToText
            isInterviewerSpeaking={isInterviewerSpeaking}
            onSaveUserResponse={(audioUrl: any, transcript: any) => saveUserResponse(audioUrl, transcript)}
            video={formValues.video}
          />

          {(           <Interviewer
            message={question}
            setIsInterviewerSpeaking={setIsInterviewerSpeaking}
            video={formValues.video}
          />)}

        </>
      )}
      </div>
    </>
  )
}
