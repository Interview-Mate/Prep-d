// interviewer.tsx
import React, { useEffect, useState, useContext } from "react";
import { Context } from '../Context';

export default function Interviewer ({ message = "This will be the first interivew question", setIsInterviewerSpeaking }: InterviewerProps) {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;
  const [messages, setMessages] = useState<string[]>([]);
  const synth = window.speechSynthesis;

  function handleIsSpeaking() {
    setIsInterviewerSpeaking(true);
  }

  function speakMessage() {
    const utterThis = new SpeechSynthesisUtterance(message);
    const voices = synth.getVoices();
    utterThis.voice = voices.find((voice) => voice.name === "Google UK English Female") || null;
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
    handleIsSpeaking();
    utterThis.onend = () => setIsInterviewerSpeaking(false);
    setMessages((prevMessages) => [...prevMessages, message]);
  }  

  useEffect(() => {
    if (!message) {
      message = "This will be the first interview question.";
    }
    synth.addEventListener('voiceschanged', speakMessage);
    return () => synth.removeEventListener('voiceschanged', speakMessage);
  }, [message]);
  

  return (
    <>
      <h1 className="speech-title">Interviewer</h1>
      <div className="speech-text">
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {index + 1}. {message}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}