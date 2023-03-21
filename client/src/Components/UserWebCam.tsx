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
    <div className='video-call'>

      {stream && (
        <>
        <video className='w-1/2' ref= {videoRef} autoPlay muted />

        {/* to be replaced with avatar  */}
        </>
      )}
    </div>
  )
}

export default UserWebCam;

