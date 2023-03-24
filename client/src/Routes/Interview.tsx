import { useContext, useEffect } from "react";
import { Context } from "../Context";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import * as ApiService from "../Util/ApiService";
import InterviewForm from "../Components/InterviewForm";
import Interviewer from "../Components/Interviewer";
import SpeechToText from "../Components/SpeechToText";
import UserWebCam from "../Components/Interview/UserWebCam";
import AvatarWebCam from "../Components/Interview/AvatarWebCam";
import { all } from "q";

interface LoadingStatus {
  userWebCam: boolean;
  avatarWebCam: boolean;
}

export default function Interview() {
<<<<<<< HEAD


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
=======
  const { currentUser } = useContext(Context) as any;

  const [formValues, setFormValues] = useState<InterviewFormValues>({
    jobLevel: "",
    companyName: "",
    jobField: "",
    jobTitle: "",
>>>>>>> dev
  });

  const [showInterviewForm, setShowInterviewForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [interviewId, setInterviewId] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [question, setQuestion] = useState("");
  // const [interviewData, setInterviewData] = useState<
  //   Array<{
  //     question: string;
  //     answer: { audioUrl: string; transcript: string };
  //   }>
  // >([]);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  // const [userAnswer, setUserAnswer] = useState<{
  //   audioUrl: string;
  //   transcript: string;
  // } | null>(null);

<<<<<<< HEAD
  const newInterview = async (values: any) => {
=======
  const newInterview = async (values: InterviewFormValues) => {
>>>>>>> dev
    const res = await ApiService.createInterview(
      currentUser.id,
      values.jobLevel,
      values.companyName,
      values.jobField,
<<<<<<< HEAD
      values.jobTitle,
=======
      values.jobTitle
>>>>>>> dev
    );
    console.log(res);
    if (res.error) {
      console.log(res.error);
    } else {
      setInterviewId(res._id);
      await getFirstQuestion(res._id, values);
    }
  };

  const getFirstQuestion = async (id: string, values: InterviewFormValues) => {
    const res = await ApiService.retrieveFirstQuestion({
      id: id,
      role: "system",
      content: `You are an interviewer, interviewing someone for a job at ${values.companyName}. It is for a ${values.jobLevel} position in the field of ${values.jobField}. Begin by asking an introductory question.`,
    });
    console.log(res);
    if (res.error) {
      console.log(res.error);
    } else {
      setQuestion(res);
    }
  };

  const handleFormSubmit = async (values: InterviewFormValues) => {
    setFormValues(values);
<<<<<<< HEAD
    console.log("values: ", values)
=======
>>>>>>> dev
    setFormSubmitted(true);
    setShowInterviewForm(false);
    await newInterview(values);
  };

  const saveUserResponse = async (audioUrl: string, transcript: string) => {
    const res = await ApiService.updateInterview(
      interviewId,
      audioUrl,
<<<<<<< HEAD
      transcript,
=======
      transcript
>>>>>>> dev
    );
    if (res.error) {
      console.log(res.error);
    } else {
      // setInterviewData((prevData) => [...prevData, { question, answer: userAnswer }]);
      if (questionCount < 7) {
        setQuestionCount((count) => count + 1);
        setQuestion(res);
<<<<<<< HEAD
        // getAnotherQuestion();
      }
      // else {
      //   getFinalFeedback() - create new method for retrieing final?
=======
      }
>>>>>>> dev
    }
  };

  return (
    <>
<<<<<<< HEAD
      <div className='h-screen w-screen bg-seasalt'>
        <Navbar />
        {showInterviewForm && <InterviewForm onFormSubmit={handleFormSubmit} />}
        {formSubmitted && (
          <>
            {formValues.video && (
              <div className='flex flex-col items-center justify-center w-full pt-20'>
                <div className='flex justify-center space-x-1'>
                  <UserWebCam />
                  <AvatarWebCam isInterviewerSpeaking={isInterviewerSpeaking} video={formValues.video} />
                </div>
              </div>
            )}
            <SpeechToText
              isInterviewerSpeaking={isInterviewerSpeaking}
              onSaveUserResponse={(audioUrl: any, transcript: any) => saveUserResponse(audioUrl, transcript)}
              video={formValues.video}
            />
            <Interviewer
              message={question}
              setIsInterviewerSpeaking={setIsInterviewerSpeaking}
              video={formValues.video}
            />
=======
      <div className="h-screen w-screen bg-seasalt">
        <Navbar />

        {showInterviewForm && <InterviewForm onFormSubmit={handleFormSubmit} />}
        {formSubmitted && (
          <>
            <div className="flex flex-col items-center justify-center w-full pt-20">
              <div className="flex justify-center space-x-1">
                <UserWebCam />
                <AvatarWebCam isInterviewerSpeaking={isInterviewerSpeaking} />
              </div>
            </div>

            <SpeechToText
              isInterviewerSpeaking={isInterviewerSpeaking}
              onSaveUserResponse={(audioUrl: any, transcript: any) =>
                saveUserResponse(audioUrl, transcript)
              }
            />

            {
              <Interviewer
                message={question}
                setIsInterviewerSpeaking={setIsInterviewerSpeaking}
              />
            }
>>>>>>> dev
          </>
        )}
      </div>
    </>
<<<<<<< HEAD
  )
  
=======
  );
>>>>>>> dev
}
