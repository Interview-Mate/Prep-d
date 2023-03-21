import React, {useState, useEffect, useRef} from 'react';

// for declaring upcoming props type
type Props = any;

const UserWebCam: React.FC<Props> = () => {

  // State to hold user's media stream once it starts
  const [stream, setStream] = useState<MediaStream | null> (null);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    const getUserMedia = async () => {
      try {
        // to request access of cam and mic from the user amd set it in stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(stream);

      } catch(error) {
        console.error('unable to access cam', error);
      }
    };


    getUserMedia();
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (

    <div className='w-full h-96'>

      {stream && (
        <video ref= {videoRef} autoPlay muted />
      
      )}

      
      {/* <div  className='flex justify-end'>
        <div className='bg-white w-24 flex justify-center'> 
           YOU
        </div>
      </div> */}

    </div>
  )
}

export default UserWebCam;

