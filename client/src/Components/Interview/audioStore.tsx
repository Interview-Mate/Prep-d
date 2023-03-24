import React, { useState, useRef } from 'react';

type AudioPlayerProps = {
  audioSrc: string;
};

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src='../../../public/lib/interview/Man_Talking.mp3' />
      <button onClick={toggleAudio}>{isPlaying ? 'Stop' : 'Play'}</button>
    </>
  );
};

export default AudioPlayer;
