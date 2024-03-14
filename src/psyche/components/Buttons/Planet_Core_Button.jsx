import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

const PlanetCoreIcon = ({ position, onClick, scale }) => {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, 'src/assets/planet_core_icon.png');
    
  const xAxis = 3
  useFrame( ({clock}) => {
  // Orbit Rotation
 // meshRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.08 ) * xAxis
  // Axis rotation
 // meshRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.08) * xAxis
  
  // meshRef.current.rotation.y += ROTATION_SPEED * 2.5
 
  meshRef.current.rotation.y = 0.4
  meshRef.current.rotation.x = 0
  meshRef.current.rotation.z = -0.2

})
  
    return (
      <mesh position={position} ref={meshRef} onClick={onClick} scale={scale}>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshBasicMaterial map={texture} /> {/* Updated material */}
    </mesh>
    );
  };
  
  export default PlanetCoreIcon;
  
