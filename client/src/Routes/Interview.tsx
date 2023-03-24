import React, {useRef, useEffect, useState } from 'react'; 
import Navbar from "../Components/Navbar";
import UserWebCam from '../Components/Interview/UserWebCam'
import AvatarWebCam from '../Components/Interview/AvatarWebCam';

export default function LiveInterview() {

  const [onceAccepted, setOnceAccepted] = useState(false);

  const handleAccept = () => {
    setOnceAccepted(true);
  }

  return (
    <div>
      <p>something</p>
    </div>
  );
}
