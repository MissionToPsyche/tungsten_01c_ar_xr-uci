import { OrbitControls, useHelper, Text } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { useContext } from "react";


import AnimatedStars from './AnimatedStars'
import PsycheAsteroid from './PsycheAsteroid'
import { animateCameraZoomIn, animateCameraZoomOut } from '../utils/useCameraZoom';
import PsycheSpacecraft from './PsycheSpacecraft'
import Light from './Light'
import {GlobalStateContext} from '../utils/useContext';




const MainPsycheContainer = () => {
  const { camera } = useThree();
  
  const { setIsOverview, isOverviewClicked } = useContext(GlobalStateContext);

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
      animateCameraZoomIn(orbitControlsRef, camera, setShowSpacecraft,setIsOverview, psycheSpacecraftRef); 
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
  
  useEffect(() => {
    if (isOverviewClicked) {
      console.log("start zoom out")
      setIsOverview(false);
      setShowSpacecraft(true);
      setIsMoving(true);
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 75;
      animateCameraZoomOut(orbitControlsRef, camera);
    }
  }, [isOverviewClicked]);

  return (
    <>
      {showCountdown && 
      <Text 
      position={[0,8,0]}
      fontSize={5}>
      {countdown}
      </Text>}
      <OrbitControls 
        ref={orbitControlsRef} 
        minDistance={6}
        maxDistance={75}
        enableRotate={false}
        enableZoom={false} />
      <AnimatedStars />
      <Light />
  
      <group>
        <PsycheAsteroid psycheRef={psycheRef} />
        {showSpacecraft && <PsycheSpacecraft scref={psycheSpacecraftRef} target={psycheRef} isMoving={isMoving}/>}
      </group>
    </>
  )
}

export default MainPsycheContainer



