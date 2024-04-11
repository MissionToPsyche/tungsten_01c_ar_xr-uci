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
  
  const {setShowAsteroid, isToSpaceCraftClicked, isToSpaceCraft, setIsToSpaceCraft, setIsOverview, isOverviewClicked, isStartClicked, showCountdown, setShowCountdown, countdown, setCountdown, showSpacecraft, setShowSpacecraft,isMoving, setIsMoving, showAsteroid} = useContext(GlobalStateContext);

  const orbitControlsRef = useRef();
  const psycheSpacecraftRef = useRef();
  const psycheRef = useRef()
  
  useEffect(() => {
    if (isStartClicked) {
      console.log("start zoom in asteroid");
      //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);
      animateCameraZoomIn(camera, psycheRef, 15, () => {
        setIsToSpaceCraft(true);
        orbitControlsRef.current.enableZoom = true;
        orbitControlsRef.current.enableRotate = true;
        orbitControlsRef.current.maxDistance = 30;
        //setShowSpacecraft(false);
      });
      setIsMoving(false);
    }
  }, [isStartClicked]); 
  
  useEffect(() => {
    if (isToSpaceCraftClicked) {
      console.log("start zoom in spacecraft");
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 100;
      animateCameraZoomOut(orbitControlsRef, camera, 50, ()=>{
        //setShowSpacecraft(true);
        setIsToSpaceCraft(false);

        
        animateCameraZoomIn(camera, psycheRef, 8, () => {
          setIsOverview(true);
          orbitControlsRef.current.enableZoom = true;
          orbitControlsRef.current.enableRotate = true;
          orbitControlsRef.current.maxDistance = 30;
          setShowAsteroid(false);
          
        });
        setIsMoving(false);
      },
      () =>{
        //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);
      
        const currentTarget = orbitControlsRef.current.target.clone();
        const newTarget = psycheSpacecraftRef.current.position.clone();
        const lerpFactor = 0.0009; // Adjust between 0 (instant change) and 1 (full transition in one frame)
        let i = 0
        function lerpTarget() {
          i += lerpFactor
          const lerpedTarget = currentTarget.lerp(newTarget, i);
          orbitControlsRef.current.target.set(lerpedTarget.x, lerpedTarget.y, lerpedTarget.z);
          
          console.log(i)
          // Check if transition is complete
          if (i < 1) {
            requestAnimationFrame(lerpTarget);
          }
        }

        requestAnimationFrame(lerpTarget);
      });
      
    }
  }, [isToSpaceCraftClicked]); 

  useEffect(() => {
    if (isOverviewClicked) {
      console.log("start zoom out")
      orbitControlsRef.current.target.set(0,0,0);
      setIsOverview(false);
      setShowSpacecraft(true);
      setIsMoving(true);
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 75;
      animateCameraZoomOut(orbitControlsRef, camera, 45, null, null);
    }
  }, [isOverviewClicked]);

  return (
    <>
      {showCountdown && (
        <group position={[0, 20, 0]}>
          <Text fontSize={4}
                anchorX="center" anchorY="middle">
            {countdown}
          </Text>
          <Text position={[0, -4, 0]}
                fontSize={2}
                anchorX="center" anchorY="middle">
            Controls:
          </Text>
          <Text position={[0, -6, 0]}
                fontSize={2}
                anchorX="center" anchorY="middle">
            Pinch to zoom
          </Text>
          <Text position={[0, -8, 0]}
                fontSize={2} 
                anchorX="center" anchorY="middle">
            Swipe to move
          </Text>
        </group>
      )}
      <OrbitControls 
        ref={orbitControlsRef} 
        minDistance={6}
        maxDistance={75}
        enableRotate={false}
        enableZoom={false} />
      <AnimatedStars />
      <Light />
  
      <group>
        {showAsteroid && <PsycheAsteroid psycheRef={psycheRef} />}
        {showSpacecraft && <PsycheSpacecraft scref={psycheSpacecraftRef} target={psycheRef} isMoving={isMoving}/>}
      </group>
    </>
  )
}

export default MainPsycheContainer



