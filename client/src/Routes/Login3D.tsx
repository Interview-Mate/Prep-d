import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
export default function Login3D() {

const model = useLoader(GLTFLoader, 'lib/landingPage/OfficeRoom.gltf');
model.scene.scale.set( 1, 1, 1 );

return (
  
    <>
    <Canvas >
      <OrbitControls/>
      <ambientLight/>
      <mesh>
        {/* Load the 3D model in scene  */}
        <object3D position = {[ 0, 0 , 0]} >

          <primitive object={model.scene} /> 

        </object3D>

      </mesh>
    </Canvas>

    </>
  
  );
}

