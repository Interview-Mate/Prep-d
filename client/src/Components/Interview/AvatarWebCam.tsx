import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import Avatar from './Avatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const AvatarWebCam = () => {

  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);

  // for the future input of audio files 
  const audioElmRef = React.useRef<HTMLAudioElement>(null!);

  // for future fetch of audio files 
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioUrl(URL.createObjectURL(file));
  };


  return (

    <>
    <div className='w-full h-auto 
    bg-gradient-radial from-white-500 via-gray-400 to-white-500
    bg-gradient-to-r from-white via-gray to-white
     '>


      <Canvas camera={{ fov: 10, position: [0, 0, 10] }} >
       <OrbitControls />
       <ambientLight />
       <Avatar />
      </Canvas>
      
      {/* <div  className='flex justify-end'>
        <div className='bg-white w-18 flex justify-center'> 
        <input type="file" accept="audio/*" onChange={onFileChange} />
        <audio src={audioUrl ?? ""} controls ref={audioElmRef} />
        </div>
      </div> */}
    </div>
         <div> 
         <audio src='lib/interview/Man_Talking.mp3'  controls 
         
        //  ref={audioElmRef}
         
         />
         </div>

        </>
  )
}

export default AvatarWebCam;

