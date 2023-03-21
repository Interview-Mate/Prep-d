import { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations } from '@react-three/drei'; 
import { Object3D } from 'three';

const Avatar = () => {
  
  const model = useLoader(GLTFLoader, 'lib/interview/Avatar.gltf');

  // to load the animations from the model
  const { actions } = useAnimations(model.animations, model.scene);

    // to scale the character 
    model.scene.scale.set(0.5, 0.5, 0.5 );

    useEffect(() => {
      console.log(actions);
      actions?.Walk?.play();
    }, [actions]);

    return (

      <mesh>

        {/* Load the 3D model in scene  */}
        <object3D position = {[ 0, -1 , 0 ]} >

          <primitive object={model.scene} /> 

        </object3D>

      </mesh>

    )
};

export default Avatar;
