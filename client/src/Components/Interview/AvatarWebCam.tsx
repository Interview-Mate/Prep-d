import React from 'react';
import Avatar from './Avatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const AvatarWebCam = ({ isInterviewerSpeaking }: any)  => {

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
