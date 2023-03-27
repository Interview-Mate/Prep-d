import { useState } from "react";
import axios from "axios";
import { CloudinaryContext, Video } from "cloudinary-react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [audioClips, setAudioClips] = useState<AudioClip[]>([]);
  const [audioUrl, setAudioUrl] = useState("");

  const convertToSpeech = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/text-to-speech",
      { text }
    );
    const audioContent = response.data.audioContent.data;
    const audioBlob = new Blob([audioContent], { type: "audio/mp3" });
    const formData = new FormData();
    const id = Math.random().toString(36).substr(2, 9);
    formData.append("file", audioBlob, `${id}.mp3`);
    formData.append("upload_preset", "prepdproject");
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const publicId = "17";
    const audioUrl = cloudinaryResponse.data.url;

    setAudioUrl(audioUrl);

    setAudioClips((prev) => [...prev, { id, publicId, transcript: text }]);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={convertToSpeech}>Convert to Speech</button>
      {audioUrl && (
        <div>
          <audio controls src={audioUrl} />
        </div>
      )}
      <CloudinaryContext
        cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
      >
        {audioClips.map((clip) => (
          <div key={clip.id}>
            <Video publicId={clip.publicId} controls format="mp3" />
            <div className="speech-text">{clip.transcript}</div>
          </div>
        ))}
      </CloudinaryContext>
    </div>
  );
}
