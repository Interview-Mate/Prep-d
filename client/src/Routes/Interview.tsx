import React, {useRef, useEffect } from 'react'; 
import Navbar from "../Components/Navbar";
import UserWebCam from '../Components/UserWebCam'



export default function LiveInterview() {
  return (
    <>
      <Navbar />
      <UserWebCam />
      <div>Here you can be live interviewed by a bot</div>
    </>
  );
}
