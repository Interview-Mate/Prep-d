import React, {useRef, useEffect, useState } from 'react'; 
import Navbar from "../Components/Navbar";
import UserWebCam from '../Components/Interview/UserWebCam'
import AvatarWebCam from '../Components/Interview/AvatarWebCam';

export default function LiveInterview() {

  
  return (
    <div className='w-full h-full'>

      <Navbar />

      <div className ='flex flex-col items-center justify-center w-full pt-20'>
        
        <div className = 'flex justify-center space-x-1'>

            <UserWebCam/>
            <AvatarWebCam/>

        </div>
        <div className = 'flex justify-end gap-5 pt-10'>
        </div>
      </div>

    </div>
  );
}
