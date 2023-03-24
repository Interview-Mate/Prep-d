import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import Avatar from './Avatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const AvatarWebCam = ({ isInterviewerSpeaking }: any)  => {
  
  console.log('yes its speaking ' + isInterviewerSpeaking );
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  // for the future input of audio files 
  const audioElmRef = React.useRef<HTMLAudioElement>(null!);

  // for future fetch of audio files 
  // const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   setAudioUrl(URL.createObjectURL(file));
  // };

  // const handlePlay = () => {
  //   setIsPlaying(true);
  // }

  // const handlePause = () => {
  //   setIsPlaying(false);
  // }


  return (

    <>

    <div className='w-full h-auto 
    bg-gradient-radial from-white-500 via-gray-400 to-white-500
    bg-gradient-to-r from-white via-gray to-white
     '>

      <Canvas camera={{ fov: 10, position: [0, 0, 10] }} >
       <OrbitControls />
       <ambientLight />
       <Avatar isInterviewerSpeaking={isInterviewerSpeaking}/>
      </Canvas>
      
    </div>

        </>
  )
}

export default AvatarWebCam;

// {/* <div> 
// {/* this might need to change to audio buffer */}
// <audio src='lib/interview/Man_Talking.mp3'  controls 
// onPlay={handlePlay} onPause={handlePause}
// //  ref={audioElmRef}

// />
// </div> */}