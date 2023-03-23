import { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations } from '@react-three/drei'; 
import { PositionalAudio } from "@react-three/drei";


const animations = ['Man_Punch','Man_Death','Man_Idle', 'Man_IdleHold'
, 'Man_Jump','Man_Punch','Man_Roll','Man_Run',' Man_Swimming','Man_SwordSlash', ] 


const Avatar = () => {
  
  const model = useLoader(GLTFLoader, 'lib/interview/Male_Suit.gltf');

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
