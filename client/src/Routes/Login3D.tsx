import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ScrollControls } from '@react-three/drei';
import { Office3D } from '../Components/landingPage/Office3D';
import { Overlay } from '../Components/landingPage/text';


export default function Login3D() {

const model = useLoader(GLTFLoader, 'lib/landingPage/OfficeRoom.gltf');
model.scene.scale.set( 1, 1, 1 );

return (
  
    <>
    <Canvas >
      <OrbitControls enableZoom={false}/>
      <ambientLight intensity={1}/>
      <ScrollControls pages={3} damping={0.25} >
        <Overlay />
        <Office3D /> 
      </ScrollControls>
    </Canvas>

    </>
  
  );
}

