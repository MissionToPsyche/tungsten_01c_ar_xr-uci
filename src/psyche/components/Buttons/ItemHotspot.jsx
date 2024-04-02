import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, MeshBasicMaterial } from 'three';
import { ROTATION_SPEED } from '../constants';

const ItemHotspot = ({ position, onClick, scale, meshRotation, imageUrl }) => {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, imageUrl);
    
  const xAxis = 3
  //useFrame( ({clock}) => {
  // meshRef.current.rotation.x = meshRotation[0]
  // meshRef.current.rotation.y = meshRotation[1]
  // meshRef.current.rotation.z = meshRotation[2]

  // if (meshRef.current) {

  // }
 
  //})

    return (
      <mesh position={position} ref={meshRef} onClick={onClick} scale={scale}>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshBasicMaterial map={texture} /> {/* Updated material */}
      
      {meshRef.current && meshRef.current.rotation.set(...meshRotation)}
    </mesh>
    );
  };
  
  export default ItemHotspot;
  
