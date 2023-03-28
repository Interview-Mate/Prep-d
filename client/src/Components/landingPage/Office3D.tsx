import React, { useLayoutEffect, useRef } from 'react'
import { useGLTF, useScroll } from '@react-three/drei';
import  gsap  from 'gsap';
import { useFrame } from '@react-three/fiber';

export function Office3D(): JSX.Element {
  const { nodes, materials } = useGLTF('lib/landingPage/OfficeRoom.gltf') as any; 

  

  const tl = useRef<gsap.core.Timeline>();
  const BoxRef = useRef<any>() 
  const FurnRef = useRef<any>() 
  const CompRef = useRef<any>() 
  const RoomRef = useRef<any>()
  const entireRoom = useRef<any>()


  const scroll = useScroll();

  useFrame(() => {
    tl?.current?.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {


    tl.current = gsap.timeline();


    tl.current.from(
      entireRoom.current.position,
      {
        duration: 0.5,
        x:200,
        y:300,
        ease:'power2.out'
      },
      0
    );

    
    // // Box animation 
    tl.current.from(

      BoxRef.current.position,
      {
        duration: 0.5,
        x: -500,
        ease: 'power2.out',
      },
      0.5
    );


    // Computer animation 
    tl.current.from(

      CompRef.current.position,
      {
        duration: 0.5,
        z: -200,
        ease: 'power2.out'
      },
      0
    );


    // Room animation 


    tl.current.from(

      RoomRef?.current.rotation,
      {
        duration: 0.5,
        z: -Math.PI,
      },
      0
    );


  }, []);

  return (
    <group dispose={null}>

      <group rotation={[Math.PI / 1.9, 0, Math.PI / 3]} scale={0.01} 
      position= {[0, -2.5, -3]}
      >
        <group ref= {entireRoom}>
          <mesh geometry={nodes.Office2_base.geometry} material={materials['LP_Rooms.001']} />
          <mesh geometry={nodes.Office2_parquet1.geometry} material={materials['LP_Rooms.001']} />
          <mesh geometry={nodes.Office2_parquet2.geometry} material={materials['LP_Rooms.001']} />
        
          <group position= {[0, 0, 0]} rotation={[0, 0, 0]} >
            <group ref = {BoxRef}>
              <mesh geometry={nodes.Office2_magazines1.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_magazines2.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_magazines3.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_magazines4.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_magazines5.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Vinyl_players.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Vinyls.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books1.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books10.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books11.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books12.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books13.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books14.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books15.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books16.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books2.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books3.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books4.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books5.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books6.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books7.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books8.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Books9.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_vial_1.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_vial_2.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_box_1.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_box_2.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_box_3.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_box_4.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_box_5.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_box_6.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_box_7.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_decoration1.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_decoration2.geometry} material={materials['LP_Rooms.001']} />
            
            </group>
          </group>
        
          <group position= {[0, 0, 0]} rotation={[0, 0, 0]}>
            <group ref = {FurnRef}>
              <mesh geometry={nodes.Office2_little_table.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_carpet.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_clock_1.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Flower.geometry} material={materials['LP_Rooms.001']} />
            </group>
          </group>

          <group position= {[0, 0, 0]} rotation={[0, 0, 0]} >
            <group ref = {CompRef}>
              <mesh geometry={nodes.Office2_monitor1.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Mouse.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Keyboard.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Pens.geometry} material={materials['LP_Rooms.001']} />
          </group>
          </group>

          <group position= {[0, 0, 0]} rotation={[0, 0, 0]} >
          <group ref = {RoomRef}>
              <mesh geometry={nodes.Office2_sofa.geometry} material={materials['LP_Rooms.001']} />      
              <mesh geometry={nodes.Office2_chair.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_picture.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_Room_Paper.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_shelves.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_stand.geometry} material={materials['LP_Rooms.001']} />
              <mesh geometry={nodes.Office2_table.geometry} material={materials['LP_Rooms.001']} />
            </group>
          </group>

        </group>
      </group>
    </group>
  )
}

useGLTF.preload('lib/landingPage/OfficeRoom.gltf')