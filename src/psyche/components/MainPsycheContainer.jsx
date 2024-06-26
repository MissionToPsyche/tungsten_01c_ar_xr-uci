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
  
  const {
    refreshRate,
    
    setShowStartButton,
    disabledAllFlowButton, setDisabledAllFlowButton,
    startZooming, setStartZooming,
    setIsToAsteroid,
    isToAsteroidClicked , setIsToAsteroidClicked,
    isLaunched, setShowAsteroid, 
    isToSpaceCraftClicked, setIsToSpaceCraftClicked,
    isToSpaceCraft, setIsToSpaceCraft, 
    setIsOverview, 
    isOverviewClicked,setIsOverviewClicked,
    isStartClicked,
     showSpacecraft, setShowSpacecraft,
     isMoving, setIsMoving, 
     showAsteroid,
     setIsAsteroidSpinning,
     setShowToolBox,
     showTravelAnimation,
     setDoneStartAnimation
    } = useContext(GlobalStateContext);
    
    
  
  const hideFlowButtons = () => {
    setIsToAsteroid(false);
    setIsToSpaceCraft(false);
    setIsOverview(false);
    setShowStartButton(false);
    //setStartZooming(true);
  }

  const [distanceFactor, setDistanceFactor] = useState(30)
  const orbitControlsRef = useRef();
  const psycheSpacecraftRef = useRef();
  const psycheRef = useRef()

  useEffect(() => {
    const handleZoomChange = () => {
      const distanceToTarget = camera.position.distanceTo(psycheRef.current.position);
      setDistanceFactor(distanceToTarget / 5);
    };

    // Add event listener for zoom change
    orbitControlsRef.current.addEventListener('change', handleZoomChange);

    return () => {
      // Remove event listener on component unmount
      orbitControlsRef.current.removeEventListener('change', handleZoomChange);
    };
  }, [camera, psycheRef]);
  
  
  useEffect(() => {
    
    if (showTravelAnimation != null && !showTravelAnimation){
      animateCameraZoomIn(refreshRate, camera, psycheRef, 30, () => {
        
      })
    }


}, [showTravelAnimation]);

  
  
  useEffect(() => {
    if (isToAsteroidClicked){
      console.log("start zoom in asteroid")
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 100;
      hideFlowButtons();
      setShowAsteroid(true);
      setIsAsteroidSpinning(false)
      animateCameraZoomOut(refreshRate, orbitControlsRef, camera, 50, ()=>{
        //setShowSpacecraft(true);
        setIsToAsteroid(false);
        animateCameraZoomIn(refreshRate, camera, psycheRef, 20, () => {
          setIsMoving(false);
          setIsOverview(true);
          setIsToSpaceCraft(true);
          setIsToAsteroid(false);
          orbitControlsRef.current.enableZoom = true;
          orbitControlsRef.current.enableRotate = true;
          orbitControlsRef.current.maxDistance = 30;
          setShowSpacecraft(false);
          //setStartZooming(false);
          
          

        });
      },
      () =>{
        //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);
      
        const currentTarget = orbitControlsRef.current.target.clone();
        const newTarget = psycheRef.current.position.clone();
        const lerpFactor = 0.1; // Adjust between 0 (instant change) and 1 (full transition in one frame)
        let i = 0
        //setIsStartAnimating(true)
        function lerpTarget() {
          i += lerpFactor
          const lerpedTarget = currentTarget.lerp(newTarget, i);
          orbitControlsRef.current.target.set(lerpedTarget.x, lerpedTarget.y, lerpedTarget.z);
          console.log(i)
          // Check if transition is complete
          
          if (i < 1) {
            requestAnimationFrame(lerpTarget);
          }
          else{
            //setIsStartAnimating(false)
          }
        }

        requestAnimationFrame(lerpTarget);
      });
      
      setIsToAsteroidClicked(false);
    }
    
  }, [isToAsteroidClicked]);
  
  useEffect(() => {
    if (isStartClicked) {
      console.log("start zoom out")
      orbitControlsRef.current.target.set(0,0,0);
      setShowAsteroid(true);
      setIsMoving(true);
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 100;
      const newTarget = psycheRef.current.position.clone();

        
      orbitControlsRef.current.target.set(newTarget.x, newTarget.y, newTarget.z);
      animateCameraZoomOut(refreshRate, orbitControlsRef, camera, 75, ()=>{
        //setShowSpacecraft(true);
        console.log("Done zoom out")
        setDoneStartAnimation(true);
        setShowAsteroid(true);
      }, null);
      
      setIsToSpaceCraft(true);
      setIsToAsteroid(true);
      
    }
  }, [isStartClicked]); 
  
  
  useEffect(() => {
    //setShowAsteroid(true);
    if (startZooming) {
      hideFlowButtons();
      console.log("launching spacecraft");
      setShowSpacecraft(true);
      animateCameraZoomIn(refreshRate, camera, psycheSpacecraftRef, 15, () => {
        //setIsToSpaceCraft(true);
        orbitControlsRef.current.enableZoom = true;
        orbitControlsRef.current.enableRotate = true;
        orbitControlsRef.current.maxDistance = 30;
        //setShowSpacecraft(false);
        //setShowStartButton(true);
        setShowToolBox(true); // Sets ToolBox flag
        setStartZooming(false);
        
         
        
      });

      //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);
    }
  }, [startZooming]);  
  
  useEffect(() => {
    if (isToSpaceCraftClicked) {
      hideFlowButtons();
      console.log("start zoom in spacecraft");
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 100;
      setShowSpacecraft(true);
      setIsMoving(false);
      animateCameraZoomOut(refreshRate, orbitControlsRef, camera, 50, ()=>{

        setIsToSpaceCraft(false);

        
        animateCameraZoomIn(refreshRate, camera, psycheRef, 8, () => {
          setIsOverview(true);
          setIsToAsteroid(true);
          orbitControlsRef.current.enableZoom = true;
          orbitControlsRef.current.enableRotate = true;
          orbitControlsRef.current.maxDistance = 30;

          setShowAsteroid(false);
          setStartZooming(false);
          
          
        });

      },
      () =>{
        //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);
        const currentTarget = orbitControlsRef.current.target.clone();
        const newTarget = psycheSpacecraftRef.current.position.clone();
        const lerpFactor = 0.1; // Adjust between 0 (instant change) and 1 (full transition in one frame)
        let i = 0
        //setIsStartAnimating(true)
        function lerpTarget() {
          i += lerpFactor
          const lerpedTarget = currentTarget.lerp(newTarget, i);
          orbitControlsRef.current.target.set(lerpedTarget.x, lerpedTarget.y, lerpedTarget.z);
          // Check if transition is complete
          console.log(i)
          
          if (i < 1) {
          //if (i < 0.2) {
            
            requestAnimationFrame(lerpTarget);
          }
          else{
            //setIsStartAnimating(false)
          }
        }

        requestAnimationFrame(lerpTarget);
      });
      setIsToSpaceCraftClicked(false);
    }
  }, [isToSpaceCraftClicked]); 

  useEffect(() => {
    if (isOverviewClicked) {
      console.log("start zoom out")
      setShowAsteroid(true);
      setShowSpacecraft(true);
      hideFlowButtons();
      setIsAsteroidSpinning(true)
      setIsMoving(true);
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 75;
      animateCameraZoomOut(refreshRate, orbitControlsRef, camera, 45, null, () =>{
      
        const currentTarget = orbitControlsRef.current.target.clone();
        const newTarget = psycheRef.current.position.clone();
        const lerpFactor = 0.01; // Adjust between 0 (instant change) and 1 (full transition in one frame)
        let i = 0
        function lerpTarget() {
          i += lerpFactor
          const lerpedTarget = currentTarget.lerp(newTarget, i);
          orbitControlsRef.current.target.set(lerpedTarget.x, lerpedTarget.y, lerpedTarget.z);
        
          // Check if transition is complete
          //if (i < 1) { 
          if (i < 1) {
            
            requestAnimationFrame(lerpTarget);
          }
          else{
            setIsToSpaceCraft(true);
            setIsToAsteroid(true);
            //setStartZooming(false);
            
          }
        }

        requestAnimationFrame(lerpTarget);
      });
      
      setIsOverviewClicked(false);
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
        <PsycheAsteroid psycheRef={psycheRef} visible={showAsteroid} distanceFactor={distanceFactor}/>
        <PsycheSpacecraft scref={psycheSpacecraftRef} target={psycheRef} distanceFactor={distanceFactor}/>
      </group>
    </>
  )
}

export default MainPsycheContainer