import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const Laser = ({ position, angle }) => {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.position.set(position.x, position.y, 0);
    meshRef.current.rotation.z = angle;
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.05, 0.05, 500, 32]} /> 
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export default Laser;
