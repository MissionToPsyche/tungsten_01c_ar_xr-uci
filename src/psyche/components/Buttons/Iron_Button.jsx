import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, MeshBasicMaterial } from 'three';
import { ROTATION_SPEED } from '../constants';

const IronIcon2 = ({ position, onClick, scale }) => {
    const meshRef = useRef();
    
    
    const texture = useLoader(TextureLoader, '/assets/nickle_icon.png');
    
  const xAxis = 3
  useFrame( ({clock}) => {
  // Orbit Rotation
  //meshRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.08) * xAxis
  // Axis rotation
  //meshRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.08) * xAxis
  


   meshRef.current.rotation.x = 0
   meshRef.current.rotation.y = 5
   meshRef.current.rotation.z = 0.5

   if (meshRef.current) {
    // Move the icon along the x-axis
   // meshRef.current.position.x += 0.001;

    // Move the icon along the y-axis
   // meshRef.current.position.y -= 0.0001;

    // Move the icon along the z-axis
   // meshRef.current.position.z += 0.001;

   }
 
  })

    return (
      <mesh position={position} ref={meshRef} onClick={onClick} scale={scale}>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshBasicMaterial map={texture} /> {/* Updated material */}
    </mesh>
    );
  };
  
  export default IronIcon2;
  
