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

    } = useContext(GlobalStateContext);
    
    
  
  const hideFlowButtons = () => {
    setIsToAsteroid(false);
    setIsToSpaceCraft(false);
    setIsOverview(false);
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
    console.log("to asteroid clicked")
    if (isToAsteroidClicked){
      console.log("start zoom in asteroid")
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 100;
      hideFlowButtons();
      setShowAsteroid(true);
      
      animateCameraZoomOut(orbitControlsRef, camera, 50, ()=>{
        //setShowSpacecraft(true);
        setIsToAsteroid(false);
        animateCameraZoomIn(camera, psycheRef, 20, () => {
          setIsMoving(false);
          setIsOverview(true);
          setIsToSpaceCraft(true);
          setIsToAsteroid(false);
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
        const lerpFactor = 0.009; // Adjust between 0 (instant change) and 1 (full transition in one frame)
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
      
      setIsToAsteroidClicked(false);
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
      hideFlowButtons();
      console.log("start zoom in spacecraft");
      orbitControlsRef.current.enableZoom = false;
      orbitControlsRef.current.enableRotate = false;
      orbitControlsRef.current.maxDistance = 100;
      setShowSpacecraft(true);
      setIsMoving(false);
      animateCameraZoomOut(orbitControlsRef, camera, 50, ()=>{

        setIsToSpaceCraft(false);

        
        animateCameraZoomIn(camera, psycheRef, 8, () => {
          setIsOverview(true);
          setIsToAsteroid(true);
          orbitControlsRef.current.enableZoom = true;
          orbitControlsRef.current.enableRotate = true;
          orbitControlsRef.current.maxDistance = 30;

          setShowAsteroid(false);
          
        });

      },
      () =>{
        //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);
        const currentTarget = orbitControlsRef.current.target.clone();
        const newTarget = psycheSpacecraftRef.current.position.clone();
        const lerpFactor = 0.009; // Adjust between 0 (instant change) and 1 (full transition in one frame)
        let i = 0
        function lerpTarget() {
          i += lerpFactor
          const lerpedTarget = currentTarget.lerp(newTarget, i);
          orbitControlsRef.current.target.set(lerpedTarget.x, lerpedTarget.y, lerpedTarget.z);
          console.log(i)
          // Check if transition is complete
          if (i < 1) {
          //if (i < 0.2) {
            
            requestAnimationFrame(lerpTarget);
          }
          else{
            
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
          //if (i < 1) { 
          if (i < 0.2) {
            
            requestAnimationFrame(lerpTarget);
          }
          else{
            setIsToSpaceCraft(true);
            setIsToAsteroid(true);
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
        <PsycheAsteroid psycheRef={psycheRef} visible={showAsteroid} />
        <PsycheSpacecraft scref={psycheSpacecraftRef} target={psycheRef} isMoving={isMoving} visible={showSpacecraft} isLaunched={isLaunched} distanceFactor={distanceFactor}/>
      </group>
    </>
  )
}

export default MainPsycheContainer



//useEffect(() => {
//  if (isToSpaceCraftClicked) {
//    console.log("start zoom in spacecraft");
//    orbitControlsRef.current.enableZoom = false;
//    orbitControlsRef.current.enableRotate = false;
//    orbitControlsRef.current.maxDistance = 100;
//    animateCameraZoomOut(orbitControlsRef, camera, 50, ()=>{
//      //setShowSpacecraft(true);
//      setIsToSpaceCraft(false);


//      animateCameraZoomIn(camera, psycheRef, 8, () => {
//        setIsOverview(true);
//        orbitControlsRef.current.enableZoom = true;
//        orbitControlsRef.current.enableRotate = true;
//        orbitControlsRef.current.maxDistance = 30;
//        setShowAsteroid(false);

//      });
//      setIsMoving(false);
//    },
//    () =>{
//      //orbitControlsRef.current.target.set(psycheSpacecraftRef.current.position.x, psycheSpacecraftRef.current.position.y, psycheSpacecraftRef.current.position.z);

//      const currentTarget = orbitControlsRef.current.target.clone();
//      const newTarget = psycheSpacecraftRef.current.position.clone();
//      const lerpFactor = 0.0009; // Adjust between 0 (instant change) and 1 (full transition in one frame)
//      let i = 0
//      function lerpTarget() {
//        i += lerpFactor
//        const lerpedTarget = currentTarget.lerp(newTarget, i);
//        orbitControlsRef.current.target.set(lerpedTarget.x, lerpedTarget.y, lerpedTarget.z);

//        console.log(i)
//        // Check if transition is complete
//        if (i < 1) {
//          requestAnimationFrame(lerpTarget);
//        }
//      }

//      requestAnimationFrame(lerpTarget);
//    });

//  }
//}, [isToSpaceCraftClicked]); 