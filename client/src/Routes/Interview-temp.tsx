import React, {useRef, useEffect, useState } from 'react'; 
import Navbar from "../Components/Navbar";
import UserWebCam from '../Components/Interview/UserWebCam'
import AvatarWebCam from '../Components/Interview/AvatarWebCam';

export default function LiveInterviewTemp() {

  const [onceAccepted, setOnceAccepted] = useState(false);

  const handleAccept = () => {
    setOnceAccepted(true);
  }

  return (
    <div className='w-full h-full'>

      <Navbar />

      <div className ='flex flex-col items-center justify-center w-full pt-20'>
        
        {onceAccepted ? (
        <div className = 'flex justify-center space-x-1'>

            <UserWebCam/>
            <AvatarWebCam/>

        </div>
        ) : (
            <div className= 'h-96 m-20'>
              <button onClick={handleAccept} className='bg-white text-black rounded-lg px-4 py-2'>
                Start Interview
              </button>
            </div>
        )}
        
        <div className = 'flex justify-end gap-5 pt-10'>
        </div>
      </div>

    </div>
  );
}
