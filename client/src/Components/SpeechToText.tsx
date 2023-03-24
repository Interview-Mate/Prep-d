import React, { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { CloudinaryContext, Video } from "cloudinary-react";
import * as ApiService from "../Util/ApiService";
import { Context } from "../Context";

export default function SpeechToText({
  isInterviewerSpeaking,
  onSaveUserResponse,
}: SpeechProps) {
  const {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    handleGetUser,
    handleCreateUser,
  } = useContext(Context) as any;

  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioClips, setAudioClips] = useState<AudioClip[]>([]);
  const audioChunks = useRef<Blob[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<string>("");
  const speechRecognition = useRef(
    new (window.SpeechRecognition || window.webkitSpeechRecognition)()
  );

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

  // To be split into more managable functions!
  const stopRecording = async () => {
    // Stop the speech recognition and media recorder
    speechRecognition.current.stop();
    mediaRecorder?.stop();

    // Send the current transcript to the Punctuator API to get the punctuated text
    const response = await ApiService.punctuate(currentTranscript);
    const punctuatedText: string = response.punctuatedText;
    setCurrentTranscript(punctuatedText);

    // Convert the audio chunks into a single audio blob
    const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });

    // Upload the audio blob to Cloudinary and get the public ID of the uploaded file
    const id = Math.random().toString(36).substr(2, 9);
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("upload_preset", "j1mgzp8n");

    // TODO move into ApiService
    try {
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dgjngnjsc/auto/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const publicId = cloudinaryResponse.data.public_id;
      const audioUrl = cloudinaryResponse.data.url;

      // Add the audio clip to the list of clips
      setAudioClips((prev) => [
        ...prev,
        { id, publicId, transcript: punctuatedText },
      ]);
      setCurrentTranscript("");
      audioChunks.current = [];
      setRecording(false);
      onSaveUserResponse(audioUrl, punctuatedText);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="speech-title">Interviewee</h1>
      <div className="speech-button-container">
        <button
          className="speech-button"
          onClick={startRecording}
          disabled={recording || isInterviewerSpeaking}
        >
          Record
        </button>

        <button
          className="speech-button"
          onClick={stopRecording}
          disabled={!recording}
        >
          Stop
        </button>
      </div>
      <h2 className="speech-title">Live Transcription:</h2>
      <p className="speech-text">{currentTranscript}</p>
      <h2 className="speech-title">Previous Audio Clips:</h2>
      <CloudinaryContext cloudName="dgjngnjsc">
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
