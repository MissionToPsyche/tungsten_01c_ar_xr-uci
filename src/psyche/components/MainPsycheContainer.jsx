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
  
  const {setIsToAsteroid,
     isToAsteroidClicked ,
    isLaunched, setShowAsteroid, 
    isToSpaceCraftClicked, 
    isToSpaceCraft, setIsToSpaceCraft, 
    setIsOverview, isOverviewClicked, 
    isStartClicked,
     showSpacecraft, setShowSpacecraft,
     isMoving, setIsMoving, 
     showAsteroid} = useContext(GlobalStateContext);

  const orbitControlsRef = useRef();
  const psycheSpacecraftRef = useRef();
  const psycheRef = useRef()
  
  
  useEffect(() => {
    console.log("to asteroid clicked")
    if (isToAsteroidClicked){
      console.log("start zoom in asteroid")
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 100;
      animateCameraZoomOut(orbitControlsRef, camera, 50, ()=>{
        //setShowSpacecraft(true);
        setIsToAsteroid(false);
        animateCameraZoomIn(camera, psycheRef, 20, () => {
          setIsMoving(false);
          orbitControlsRef.current.enableZoom = true;
          orbitControlsRef.current.enableRotate = true;
          orbitControlsRef.current.maxDistance = 30;
          setShowSpacecraft(false);
        });
      },
      () =>{
        //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);
      
        const currentTarget = orbitControlsRef.current.target.clone();
        const newTarget = psycheRef.current.position.clone();
        const lerpFactor = 0.0009; // Adjust between 0 (instant change) and 1 (full transition in one frame)
        let i = 0
        function lerpTarget() {
          i += lerpFactor
          const lerpedTarget = currentTarget.lerp(newTarget, i);
          orbitControlsRef.current.target.set(lerpedTarget.x, lerpedTarget.y, lerpedTarget.z);
        
          // Check if transition is complete
          if (i < 1) {
            requestAnimationFrame(lerpTarget);
          }
        }

        requestAnimationFrame(lerpTarget);
      });
    }
    
  }, [isToAsteroidClicked]);
  
  useEffect(() => {
    console.log("isStartClicked: ")
    console.log(isStartClicked)
    if (isStartClicked) {
      console.log("start zoom out")
      orbitControlsRef.current.target.set(0,0,0);
      setShowAsteroid(true);
      setIsMoving(true);
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 75;
      animateCameraZoomOut(orbitControlsRef, camera, 50, ()=>{
        //setShowSpacecraft(true);
        
        
        setShowAsteroid(true);
      },
      () =>{
        //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);
      
        const currentTarget = orbitControlsRef.current.target.clone();
        const newTarget = psycheRef.current.position.clone();
        const lerpFactor = 0.09; // Adjust between 0 (instant change) and 1 (full transition in one frame)
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
      setIsToSpaceCraft(true);
      setIsToAsteroid(true);
      
    }
  }, [isStartClicked]); 
  
  
  useEffect(() => {
    //setShowAsteroid(true);
    if (isLaunched) {
      console.log("launching spacecraft");
      setShowSpacecraft(true);
      animateCameraZoomIn(camera, psycheSpacecraftRef, 15, () => {
        //setIsToSpaceCraft(true);
        orbitControlsRef.current.enableZoom = true;
        orbitControlsRef.current.enableRotate = true;
        orbitControlsRef.current.maxDistance = 30;
        //setShowSpacecraft(false);
      });
      //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);
    }
  }, [isLaunched]);  
  
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
      setShowAsteroid(true);
      setShowSpacecraft(true);
      setIsOverview(false);

      setIsMoving(true);
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 75;
      animateCameraZoomOut(orbitControlsRef, camera, 45, null, () =>{
      
        const currentTarget = orbitControlsRef.current.target.clone();
        const newTarget = psycheRef.current.position.clone();
        const lerpFactor = 0.0009; // Adjust between 0 (instant change) and 1 (full transition in one frame)
        let i = 0
        function lerpTarget() {
          i += lerpFactor
          const lerpedTarget = currentTarget.lerp(newTarget, i);
          orbitControlsRef.current.target.set(lerpedTarget.x, lerpedTarget.y, lerpedTarget.z);
        
          // Check if transition is complete
          if (i < 1) {
            requestAnimationFrame(lerpTarget);
          }
        }

        requestAnimationFrame(lerpTarget);
      });
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
        <PsycheAsteroid psycheRef={psycheRef} visible={showAsteroid} />
        <PsycheSpacecraft scref={psycheSpacecraftRef} target={psycheRef} isMoving={isMoving} visible={showSpacecraft}/>
      </group>
    </>
  )
}

export default MainPsycheContainer



