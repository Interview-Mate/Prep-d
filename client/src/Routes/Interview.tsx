import React, {useRef, useEffect } from 'react'; 
import Navbar from "../Components/Navbar";
import UserWebCam from '../Components/Interview/UserWebCam'
import AvatarWebCam from '../Components/Interview/AvatarWebCam';
import useAudioStore from '../Components/Interview/audioStore';
import {shallow} from 'zustand/shallow';
import { PositionalAudio } from '@react-three/drei';

export default function LiveInterview() {


  const [audioStart, audioPlay, setAudioPlay] = useAudioStore(
    (state) => [state.audioStart, state.audioPlay, state.setAudioPlay],
    shallow
  );

  const soundRef = useRef();

  return (
    <div className='w-full h-full'>

      <Navbar />

      <div className ='flex flex-col items-center justify-center w-full pt-20'>
        
        <div className = 'flex justify-center space-x-1'>

            <UserWebCam/>
            <AvatarWebCam/>
            
            {audioStart ? (
              <>
                <PositionalAudio 
                url = {'../../public/lib/interview/Man_Talking.mp3'}
                ref= {soundRef}
                onEnded= {() => setAudioPlay(false)}
                distance = {1}
                />
              </>
            ) : null}

        </div>
        <div className = 'flex justify-end gap-5 pt-10'>
          <button className= 'bg-white rounded p-3 ' onClick = {() => setAudioPlay(!audioPlay)}>
            {audioPlay? 'Pause' : 'Play'}
        </button>
        </div>
      </div>

    </div>
  );
}
