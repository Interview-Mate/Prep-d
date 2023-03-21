import React, {useRef, useEffect } from 'react'; 
import Navbar from "../Components/Navbar";
import UserWebCam from '../Components/UserWebCam'



export default function LiveInterview() {


  return (
    <div className='w-full h-full'>

      <Navbar />

      <div className ='flex flex-col items-center justify-center h-full'>
        
        <div className = 'flex justify-center space-x-8'>

            <UserWebCam/>
            <UserWebCam/>

        </div>

      </div>

    </div>
  );
}
