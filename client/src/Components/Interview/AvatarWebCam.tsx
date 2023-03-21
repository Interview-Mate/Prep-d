import React, {useState, useEffect, useRef} from 'react';
import Avatar from './Avatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// for declaring upcoming props type
// type Props = any;

const AvatarWebCam = () => {


  return (

    <div className='w-full h-96 bg-white'>
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

