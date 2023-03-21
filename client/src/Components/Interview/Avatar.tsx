import { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations } from '@react-three/drei'; 
import { Object3D } from 'three';


const animations = ['Alien_Punch','Alien_Death','Alien_Idle', 'Alien_IdleHold'
, 'Alien_Jump','Alien_Punch','Alien_Roll','Alien_Run',' Alien_Swimming','Alien_SwordSlash', ] 


const Avatar = () => {
  
  const model = useLoader(GLTFLoader, 'lib/interview/Avatar.gltf');

  // to load the animations from the model
  const { actions } = useAnimations(model.animations, model.scene);

    // to scale the character 
    model.scene.scale.set( 1, 1, 1 );
    

    useEffect(() => {

      
      console.log(actions);
      actions?.Alien_Clapping?.play();
    }, [actions]);


    return (

      <mesh>

        {/* Load the 3D model in scene  */}
        <object3D position = {[ 0, -2.2 , 0]} >

          <primitive object={model.scene} /> 

        </object3D>

      </mesh>

    )
};

export default Avatar;
