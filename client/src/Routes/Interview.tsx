import React, {useRef, useEffect } from 'react'; 
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

      </div>

    </div>
  );
}
