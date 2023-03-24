// interviewer.tsx
import React, { useEffect, useState, useContext } from "react";
import { Context } from '../Context';

export default function Interviewer ({ videoQuestion, setIsInterviewerSpeaking, video }: InterviewerProps) {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  const synth = window.speechSynthesis;

  function handleIsSpeaking() {
    setIsInterviewerSpeaking(true);
  }

  function speakMessage() {
    // const utterThis = new SpeechSynthesisUtterance(message + 'I will do all the hand motions and gestures that you told me how to do and I will nail it ');
    const utterThis = new SpeechSynthesisUtterance(videoQuestion);
    const voices = synth.getVoices();
    utterThis.voice = voices.find((voice) => voice.name === "Google UK English Male") || null;
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
    handleIsSpeaking();
    utterThis.onend = () => setIsInterviewerSpeaking(false);
  }  

  function delaySpeakMessage() {
    setTimeout(speakMessage, 3000);
  }

  useEffect(() => {
      delaySpeakMessage();
  }, [videoQuestion]);
  

  return (
    <>
      <div className="speech-text">
          {videoQuestion}
      </div>
    </>
  )
}