import React, {useState, useEffect, useRef} from 'react';
import Avatar from './Avatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// for declaring upcoming props type
// type Props = any;

const AvatarWebCam = () => {


  return (

    <div className='w-full h-auto 
    bg-gradient-radial from-white-500 via-gray-500 to-white-500
    bg-gradient-to-r from-white via-gray to-white

     '>
      <Canvas camera={{ fov: 10, position: [0, 0, 10] }} >
       <OrbitControls />
       <ambientLight />
       <Avatar />
      </Canvas>


      {/* <div  className='flex justify-end'>
        <div className='bg-white w-18 flex justify-center'> 
           YOUR MASTER
        </div>
      </div> */}


    </div>
  )
}

export default AvatarWebCam;

