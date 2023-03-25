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
import MrBPrep from '../Assets/MrBPrep.png';
import { all } from "q";

interface LoadingStatus {
  userWebCam: boolean;
  avatarWebCam: boolean;
}

export default function Interview() {
  const { currentUser } = useContext(Context) as any;

  console.log(currentUser)

  const [formValues, setFormValues] = useState<InterviewFormValues>({
    jobLevel: "",
    companyName: "",
    jobField: "",
    jobTitle: "",
    video: true,
  });

  const [showInterviewForm, setShowInterviewForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [interviewId, setInterviewId] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [videoQuestion, setVideoQuestion] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);

  const handleFormSubmit = async (values: InterviewFormValues) => {
    setFormValues(values);
    setFormSubmitted(true);
    setShowInterviewForm(false);
    await newInterview(values);
  };

  const newInterview = async (values: InterviewFormValues) => {
    const res = await ApiService.createInterview(
      currentUser.id,
      values.jobLevel,
      values.companyName,
      values.jobField,
      values.jobTitle
    );
    if (res.error) {
      console.log(res.error);
    } else {
      setInterviewId(res._id);
      await getQuestion(res._id, values);
    }
  };

  const getQuestion = async (id: string, values: InterviewFormValues) => {
    const res = await ApiService.retrieveQuestion({
      id: id,
      role: "system",
      content: `You are an interviewer, interviewing someone for a job at ${values.companyName}. It is for a ${values.jobLevel} position in the field of ${values.jobField}. Begin by asking an introductory question.`,
    });
    if (res.error) {
      console.log(res.error);
    } else {
      nextQuestion(res, values);
    }
  };

  const nextQuestion = (res: string, values: InterviewFormValues) => {
    if (values.video === true) {
      setVideoQuestion(res);
    } else {
      setConversation((prevData) => [
        ...prevData,
        { message: res, messageType: "interviewer" },
      ]);
    }
  };

  // we need a get final feedback function after question 8

  const saveUserResponse = async (audioUrl: string, transcript: string) => {
    if (!audioUrl) {
      setConversation((prevData) => [
        ...prevData,
        { message: transcript, messageType: "user" },
      ]);
    }
    const res = await ApiService.updateInterview(
      interviewId,
      audioUrl,
      transcript
    );
    if (res.error) {
      console.log(res.error);
    } else {
      if (questionCount < 8) {
        setQuestionCount((count) => count + 1);
        nextQuestion(res, formValues);
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-seasalt">
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
                <Interviewer
                  videoQuestion={videoQuestion}
                  setIsInterviewerSpeaking={setIsInterviewerSpeaking}
                  video={formValues.video}
                />
              </div>
            )}
            {!formValues.video && (
              <>
                <h2 className="speech-title">Chat Interview</h2>
                <div className="chat-container">
                  {conversation.map((value, index) => (
                    <div
                      key={`${value.messageType}-${index}`}
                      className={`chat-message ${value.messageType === "interviewer" ? "interviewer" : "user"}`}
                    >
                      {value.messageType === "interviewer" ? (
                        <img src={MrBPrep} className="avatar" alt="Interviewer Avatar" />
                      ) : (
                        <img src={currentUser.image} className="avatar" alt="User Avatar" />
                      )}
                      <div className="chat-bubble">{value.message}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <SpeechToText
              isInterviewerSpeaking={isInterviewerSpeaking}
              onSaveUserResponse={(audioUrl: any, transcript: any) => saveUserResponse(audioUrl, transcript)}
              video={formValues.video}
            />
          </>
        )}
      </div>
    </>
  );
}