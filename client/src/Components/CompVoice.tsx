import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CloudinaryContext, Video } from "cloudinary-react";

//TODO this isn't working as intended yet...

type AudioClip = {
  id: string;
  publicId: string;
};

const CompVoice: React.FC = () => {
  const synth = window.speechSynthesis;

  const inputRef = useRef<HTMLInputElement>(null);
  const voiceSelectRef = useRef<HTMLSelectElement>(null);
  const pitchRef = useRef<HTMLInputElement>(null);
  const pitchValueRef = useRef<HTMLDivElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);
  const rateValueRef = useRef<HTMLDivElement>(null);
  const [audioClips, setAudioClips] = useState<AudioClip[]>([]);

  let voices: SpeechSynthesisVoice[] = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    if (voiceSelectRef.current) {
      voiceSelectRef.current.innerHTML = "";
    }

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);

      if (voiceSelectRef.current) {
        voiceSelectRef.current.appendChild(option);
      }
    }
  }

  useEffect(() => {
    populateVoiceList();

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, []);

  const handleSave = async () => {
    if (
      inputRef.current &&
      voiceSelectRef.current &&
      pitchRef.current &&
      rateRef.current
    ) {
      const inputTxt = inputRef.current.value;
      const utterThis = new SpeechSynthesisUtterance(inputTxt);
      const selectedOption =
        voiceSelectRef.current.selectedOptions[0].getAttribute("data-name");
      for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
        }
      }
      utterThis.pitch = parseFloat(pitchRef.current.value);
      utterThis.rate = parseFloat(rateRef.current.value);

      const mediaStream = new MediaStream();
      const audioContext = new AudioContext();
      const destination = audioContext.createMediaStreamDestination();
      const gainNode = audioContext.createGain();

      gainNode.gain.value = 1;

      const audioElement = new Audio();
      audioElement.src = "";

      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(gainNode).connect(destination);
      mediaStream.addTrack(destination.stream.getAudioTracks()[0]);

      const mediaRecorder = new MediaRecorder(mediaStream);
      const audioChunks: Blob[] = [];

      mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => {
        audioChunks.push(event.data);
      });
      
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const id = Math.random().toString(36).substr(2, 9);
      const formData = new FormData();
      console.log(audioBlob)
      formData.append("file", audioBlob);
      formData.append("upload_preset", "j1mgzp8n");
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response)
        const publicId = response.data.public_id;
        setAudioClips((prev) => [...prev, { id, publicId },]);
      } catch (error) {
        console.error(error);
      }
      mediaRecorder.start();
      synth.speak(utterThis);
    }
  };

  const handlePitchChange = () => {
    if (pitchRef.current && pitchValueRef.current) {
      pitchValueRef.current.textContent = pitchRef.current.value;
    }
  };

  const handleRateChange = () => {
    if (rateRef.current && rateValueRef.current) {
      rateValueRef.current.textContent = rateRef.current.value;
    }
  };

  return (
    <>
      <form onSubmit={handleSave}>
        <label className="speech-text" htmlFor="input">Enter Text:</label>
        <input type="text" id="input" className="txt" ref={inputRef} />
        <br></br>
        <label className="speech-text" htmlFor="voice">Select Voice:</label>
        <select id="voice" ref={voiceSelectRef}>
          <option value="">Select Voice</option>
        </select>
        <div>
          <label className="speech-text" htmlFor="rate">Rate:</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            defaultValue="1"
            id="rate"
            ref={rateRef}
            onChange={handleRateChange}
          />
          <div className="rate-value" ref={rateValueRef}>
            1
          </div>
        </div>
        <div>
          <label className="speech-text" htmlFor="pitch">Pitch:</label>
          <input
            type="range"
            min="0"
            max="2"
            defaultValue="1"
            id="pitch"
            ref={pitchRef}
            onChange={handlePitchChange}
          />
          <div className="pitch-value" ref={pitchValueRef}>
            1
          </div>
        </div>
        <button className="speech-button" type="button" onClick={handleSave}>
          Save Audio Clip
        </button>
      </form>
      <ul>
        <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string}>
          {audioClips.map((clip) => (
            <li key={clip.id}>
              <Video publicId={clip.publicId} controls />
            </li>
          ))}
        </CloudinaryContext>
      </ul>
    </>
  );
};

export default CompVoice;


