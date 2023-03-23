import { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useAnimations } from '@react-three/drei'; 
import { PositionalAudio } from "@react-three/drei";


const animations = ['Man_Clapping','Man_Death','Man_Idle', 'Man_Run'
, 'Man_Jump','Man_Punch','Man_greeting','Man_talking_2','Man_talking', ] 


const Avatar = ({ isPlaying }: { isPlaying: boolean }) => {

  console.log("this is the props" + isPlaying);
  
  // const model = useLoader(GLTFLoader, 'lib/interview/Male_Suit.gltf');
  const model = useLoader(GLTFLoader, 'lib/interview/Avatarmore.gltf');
  // const model = useLoader(FBXLoader, 'lib/interview/Talking.fbx');

  // to load the animations from the model
  const { actions } = useAnimations(model.animations, model.scene);

  // to set the play and pause
  const [playing, setPlaying] = useState(false);

  // to scale the character 
  model.scene.scale.set( 1, 1, 1 );
    

  useEffect(() => {

    //this is how you animate the character 
    
    console.log(actions);
    actions?.Man_Idle?.play();
    // actions?.Man_talking?.play();

    if (isPlaying) {
    actions?.Man_talking?.play();
    }
  }, [actions]);


  return (

    <mesh>
      

      {/* Load the 3D model in scene  */}
      <object3D position = {[ 0, -4.3 , 0]} >

        <primitive object={model.scene} /> 

      </object3D>

    </mesh>

  )
};

export default Avatar;
