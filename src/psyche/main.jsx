import { OrbitControls, useHelper, Text } from '@react-three/drei'
import AnimatedStars from './components/AnimatedStars'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import PsycheAsteroid from './components/PsycheAsteroid'
import { animateCameraZoom } from './components/CameraZoom';
import PsycheSpacecraft from './components/PsycheSpacecraft'
import { useThree } from '@react-three/fiber'


const MainPsycheContainer = () => {
  const { camera } = useThree();
  const directionalLightRef = useRef()
  const directionalLightRefTwo = useRef()
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink')
  
  const orbitControlsRef = useRef();
  const psycheSpacecraftRef = useRef();
  const psycheRef = useRef()
  
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [showSpacecraft, setShowSpacecraft] = useState(true);
  const [isMoving, setIsMoving] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCountdown(false);
      
      console.log("start zoom in")
      animateCameraZoom(setShowSpacecraft, psycheSpacecraftRef, camera); 
      
      if (!showSpacecraft) {
        orbitControlsRef.current.enableZoom = true;
        orbitControlsRef.current.enableRotate = true;
        orbitControlsRef.current.maxDistance = 30;
      }
    }, 3000); 

    return () => clearTimeout(timer);
  }, []); 
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === -5) return clearInterval(interval);
      if (countdown === -3) {
        setIsMoving(false);
      }
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <>
      {showCountdown && 
      <Text 
      position={[0,8,0]}
      fontSize={5}>
      {countdown}
      </Text>}
      <color attach='background' args={['black']} />
      <OrbitControls 
        ref={orbitControlsRef} 
        minDistance={6}
        maxDistance={75}
        enableRotate={false}
        enableZoom={false} />
      <AnimatedStars />
      <directionalLight
        ref={directionalLightRef}
        position={[0, 0, 10]}
        intensity={1.5}
      />
      <directionalLight ref={directionalLightRefTwo} position={[0, 0, -10]} intensity={1.5}/>

      <group>
        <PsycheAsteroid psycheRef={psycheRef} />
        {showSpacecraft && <PsycheSpacecraft scref={psycheSpacecraftRef} target={psycheRef} isMoving={isMoving}/>}
      </group>
    </>
  )
}

export default MainPsycheContainer



