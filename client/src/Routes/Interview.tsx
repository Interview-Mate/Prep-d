import { useContext, useEffect, useRef } from "react";
import { Context } from "../Context";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import * as ApiService from "../Util/ApiService";
import InterviewForm from "../Components/InterviewForm";
import Interviewer from "../Components/Interviewer";
import SpeechToText from "../Components/SpeechToText";
import UserWebCam from "../Components/Interview/UserWebCam";
import AvatarWebCam from "../Components/Interview/AvatarWebCam";
import InterviewFeedback from "../Components/InterviewFeedback";
import MrBPrep from "../Assets/MrBPrep.png";
import { all } from "q";



export default function Interview() {
  const { currentUser } = useContext(Context) as any;

  console.log(currentUser);

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
  const [questionCount, setQuestionCount] = useState(1);
  const [videoQuestion, setVideoQuestion] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [interviewEnd, setInterviewEnd] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);



    //to delay the loading of the avatar  
  
    const [isUserWebCamLoaded, setIsUserWebCamLoaded] = useState(false);


    const handleUserWebCamLoaded = () => {
      setTimeout(() => {
        setIsUserWebCamLoaded(true);
      }, 3000); 
    };
  

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleFormSubmit = async (values: InterviewFormValues) => {
    setFormValues(values);
    setFormSubmitted(true);
    setShowInterviewForm(false);
    await newInterview(values);
  };

  const newInterview = async (values: InterviewFormValues) => {
    setIsInterviewerSpeaking(true);
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
    console.log("res in next question", res);
    if (values.video === true) {
      setVideoQuestion(res);
    } else {
      setConversation((prevData) => [
        ...prevData,
        { message: res, messageType: "interviewer" },
      ]);
      setIsInterviewerSpeaking(false);
    }
  };

  const endInterview = async (res: string, formValues: InterviewFormValues) => {
    try {
      console.log("in end interview");
      nextQuestion(res, formValues);
      console.log("res in endInterview", res);
      const result = await ApiService.endInterview(interviewId);
      const resultObj = JSON.parse(result);
      console.log("result of end interview", resultObj);
      setInterviewEnd(true);
      setRating(resultObj.overall_number);
      setFeedback(resultObj.overall_feedback);
      setSuggestions(resultObj.suggestions);
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserResponse = async (audioUrl: string, transcript: string) => {
    try {
      if (!audioUrl) {
        setConversation((prevData) => [
          ...prevData,
          { message: transcript, messageType: "user" },
        ]);
      }
      const res = await ApiService.updateInterview(
        interviewId,
        audioUrl,
        transcript,
        questionCount
      );

      if (questionCount < 3) {
        setQuestionCount((count) => count + 1);
        nextQuestion(res, formValues);
      } else {
        endInterview(res, formValues);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-seasalt">
        <Navbar />
        {!interviewFeedback && (<>
        {showInterviewForm && <InterviewForm onFormSubmit={handleFormSubmit} />}
        {formSubmitted && (
          <>
            {formValues.video && (
              <div className="flex flex-col items-center justify-center w-full pt-20">
                <div className="flex justify-center space-x-1">
                  <UserWebCam onLoaded={handleUserWebCamLoaded} />
                  {isUserWebCamLoaded && (
                    <AvatarWebCam
                      isInterviewerSpeaking={isInterviewerSpeaking}
                      video={formValues.video}
                    />
                  )}
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
                      className={`chat-message ${
                        value.messageType === "interviewer"
                          ? "interviewer"
                          : "user"
                      }`}
                    >
                      {value.messageType === "interviewer" ? (
                        <img
                          src={MrBPrep}
                          className="avatar"
                          alt="Interviewer Avatar"
                        />
                      ) : (
                        <img
                          src={currentUser.image}
                          className="avatar"
                          alt="User Avatar"
                        />
                      )}
                      <div className="chat-bubble">{value.message}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {!interviewEnd ? (
              <SpeechToText
                isInterviewerSpeaking={isInterviewerSpeaking}
                onSaveUserResponse={(audioUrl: any, transcript: any) =>
                  saveUserResponse(audioUrl, transcript)
                }
                video={formValues.video}
                interviewEnd={interviewEnd}
              />
            ) : (
              <div className='flex items-center justify-center'>
                <button className="bg-african-violet-900 text-white font-bold py-2 px-4 rounded" onClick={() => setInterviewFeedback(true)}>
                  View Rating and Feedback
                </button>
              </div>
            )}
            
          </>
        )}</>)}{interviewFeedback && (
          <InterviewFeedback
            rating={rating}
            feedback={feedback}
            suggestions={suggestions}
          />
        )}
      </div>
    </>
  );
}
