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




const AsteroidContainer = () => {
  const { camera } = useThree();
  
  const {step, setStep, setIsOverview, isOverviewClicked, isStartClicked} = useContext(GlobalStateContext);

  const orbitControlsRef = useRef();
  const psycheSpacecraftRef = useRef();
  const psycheRef = useRef()
  
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showSpacecraft, setShowSpacecraft] = useState(true);
  const [isMoving, setIsMoving] = useState(true);
  
  useEffect(() => {
    if (isStartClicked) {
      setShowCountdown(true);
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            setShowCountdown(false);
            console.log("start zoom in");
            animateCameraZoomIn(orbitControlsRef, camera, setShowSpacecraft, setIsOverview, psycheSpacecraftRef);
            //setIsMoving(true);
            orbitControlsRef.current.enableZoom = true;
            orbitControlsRef.current.enableRotate = true;
            orbitControlsRef.current.maxDistance = 30;
            return prevCountdown;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
  }, [isStartClicked]); 

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
      </group>
    </>
  )
}

export default AsteroidContainer



