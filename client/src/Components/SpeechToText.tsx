import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { CloudinaryContext, Video } from "cloudinary-react";
import * as ApiService from "../Util/ApiService";
import { Context } from '../Context';

export default function SpeechToText({ isInterviewerSpeaking, onSaveUserResponse, video }: SpeechProps) {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioClips, setAudioClips] = useState<AudioClip[]>([]);
  const audioChunks = useRef<Blob[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<string>("");
  const speechRecognition = useRef(
    new (window.SpeechRecognition || window.webkitSpeechRecognition)()
  );
  const [responseSubmitted, setResponseSubmitted] = useState(false);

  speechRecognition.current.interimResults = true;
  speechRecognition.current.continuous = true;

  useEffect(() => {
    // Request access to the user's microphone
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      // Triggers when a chunk of audio is ready for processing
      recorder.addEventListener("dataavailable", (event) => {
        audioChunks.current.push(event.data);
      });
    });

    // Triggers when there is some speech for transcribing
    speechRecognition.current.addEventListener("result", (event: any) => {
      let newTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        newTranscript += event.results[i][0].transcript;
      }
      setCurrentTranscript(newTranscript);
    });

    // This prevents the microphone turning off if they haven't stopped
    speechRecognition.current.addEventListener("end", () => {
      if (recording) {
        speechRecognition.current.start();
      }
    });
  }, []);

  const startRecording = () => {
    setRecording(true);
    speechRecognition.current.start();
    mediaRecorder?.start();
  };

  const turnOffAudioInput = () => {
  speechRecognition.current.stop();
  mediaRecorder?.stop();
  }

  const punctuateText = async (currentTranscript: string) => {
    const response = await ApiService.punctuate(currentTranscript);
    const punctuatedText: string = response.punctuatedText;
    return punctuatedText
  }

  // To be split into more managable functions!
  const stopRecording = async () => {
    if (video) {
      // Stop the speech recognition and media recorder
      turnOffAudioInput()
      // Send the current transcript to the Punctuator API to get the punctuated text
      const punctuatedText = await punctuateText(currentTranscript)
      setCurrentTranscript(punctuatedText);

      // Convert the audio chunks into a single audio blob
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });

      // Upload the audio blob to Cloudinary and get the public ID of the uploaded file
      const id = Math.random().toString(36).substr(2, 9);
      const formData = new FormData();
      formData.append("file", audioBlob);
      formData.append("upload_preset", "j1mgzp8n");

      const cloudinaryResponse = await ApiService.postAudio(formData);
      const publicId = cloudinaryResponse.data.public_id;
      const audioUrl = cloudinaryResponse.data.url

      // Add the audio clip to the list of clips
      setAudioClips((prev) => [
        ...prev,
        { id, publicId, transcript: punctuatedText },
      ]);
      audioChunks.current = [];
      setRecording(false);
      onSaveUserResponse(audioUrl, punctuatedText);
    }
    setResponseSubmitted(true);
    onSaveUserResponse(null, currentTranscript);
    setCurrentTranscript("");
  };

  if (!video) {
    return (
      <div>
        <h1 className="speech-title">Interviewee</h1>
        <div className="speech-text">
          {audioClips.map((clip) => (
            <div key={clip.id}>
              <p>{clip.transcript}</p>
            </div>
          ))}
          <textarea
            className="speech-text"
            value={currentTranscript}
            onChange={(e) => setCurrentTranscript(e.target.value)}
            placeholder="Type your answer here..."
            disabled={isInterviewerSpeaking}
          />
          {!responseSubmitted && (
            <button className="speech-button" onClick={stopRecording} disabled={responseSubmitted}>
              Submit
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="speech-title">Interviewee</h1>
      <div className="speech-button-container">
        <button className="speech-button" onClick={startRecording} disabled={recording || isInterviewerSpeaking}>
          Record
        </button>
        <button className="speech-button" onClick={stopRecording} disabled={recording}>
          Stop
        </button>
      </div>
      <h2 className="speech-title">Live Transcription:</h2>
      <p className="speech-text">{currentTranscript}</p>
      <h2 className="speech-title">Previous Audio Clips:</h2>
      <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string}>
        {audioClips.map((clip) => (
          <div key={clip.id}>
            <Video publicId={clip.publicId} controls format="mp4" />
            <div className="speech-text">{clip.transcript}</div>
          </div>
        ))}
      </CloudinaryContext>
    </div>
  );
}
