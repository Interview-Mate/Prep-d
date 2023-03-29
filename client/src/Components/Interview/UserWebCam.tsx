import React, {useState, useEffect, useRef} from 'react';


type Props = {
  onLoaded: () => void;
};

const UserWebCam: React.FC<Props> = ({ onLoaded}) => {

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

        // call onLoaded once the media stream has started
        onLoaded();

      } catch(error) {
        console.error('unable to access cam', error);
      }
    };


    getUserMedia();
  }, [onLoaded]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (

    <div className='w-full h-auto'>

      {stream && (
        <video ref= {videoRef} autoPlay muted />
      
      )}


    </div>
  )
}

export default UserWebCam;

