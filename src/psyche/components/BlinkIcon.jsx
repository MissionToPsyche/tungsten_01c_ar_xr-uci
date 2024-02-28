import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const BlinkIcon = ({ position, onClick, scale }) => {
    const meshRef = useRef();
    
    
    const texture = useLoader(TextureLoader, '/assets/info_star.jpeg');
  
    return (
      <mesh position={position} 
      ref={meshRef} 
      onClick={onClick} 
      scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    );
  };
  
  export default BlinkIcon;
  
