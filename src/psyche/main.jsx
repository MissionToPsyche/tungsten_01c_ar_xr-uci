import { OrbitControls, useHelper } from '@react-three/drei'
import AnimatedStars from './components/AnimatedStars'
import { useRef, useEffect, useState } from 'react'
import Earth from './components/Earth'
import * as THREE from 'three'
import PsycheAsteroid from './components/PsycheAsteroid'
import { useCameraZoom } from './components/CameraZoom';
import PsycheSpacecraft from './components/PsycheSpacecraft'
import { Text } from '@react-three/drei';


const MainPsycheContainer = () => {
  const directionalLightRef = useRef()
  const directionalLightRefTwo = useRef()
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink')
  const orbitControlsRef = useRef();
  const psycheSpacecraftRef = useRef();
  const psycheRef = useRef()

  // how close we want to get
  const targetZoomPosition = 0.3;
  // Initiates Zoom
  //useCameraZoom(orbitControlsRef, targetZoomPosition)
  //orbitControlsRef.current.maxDistance = 100
  
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCountdown(false);
      
      // Start zooming in after the timeout
      console.log("start zoom in")
      animateCameraZoom(orbitControlsRef, 7); // Adjust the target zoom position as needed
      
    }, 3000); 

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []); 
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 0) return clearInterval(interval);
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
        <PsycheSpacecraft ref={psycheSpacecraftRef} target={psycheRef}/>	
      </group>
    </>
  )
}

const animateCameraZoom = (orbitControlsRef, targetZoomPosition) => {
  let zoom = 75; 
  let zoomSpeed = 0.7; // Adjust zoom speed as needed

  const animateZoom = () => {
    if (orbitControlsRef.current && orbitControlsRef.current.object) {
      const camera = orbitControlsRef.current.object;
      zoom -= zoomSpeed;
      camera.position.z = zoom;
      
      if (zoom > targetZoomPosition) {
        requestAnimationFrame(animateZoom);
      } else {
        camera.position.z = targetZoomPosition; // Ensure we reach the target exactly
        orbitControlsRef.current.enableZoom = true; // Enable zoom after animation is complete
        orbitControlsRef.current.enableRotate = true; // Enable zoom after animation is complete
        orbitControlsRef.current.maxDistance = 30
      }
    }
    
    if (zoomSpeed > 0.15){
      zoomSpeed -= 0.005;
    }
  };

  animateZoom();
};
export default MainPsycheContainer



