import { OrbitControls, useHelper } from '@react-three/drei'
import AnimatedStars from './components/AnimatedStars'
import { useRef, useEffect } from 'react'
import Earth from './components/Earth'
import * as THREE from 'three'
import PsycheAsteroid from './components/PsycheAsteroid'
import { useCameraZoom } from './components/CameraZoom';

const MainPsycheContainer = () => {
  const directionalLightRef = useRef()
  const directionalLightRefTwo = useRef()
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink')
  const orbitControlsRef = useRef();

  // how close we want to get
  const targetZoomPosition = 0.3;
  // Initiates Zoom
  useCameraZoom(orbitControlsRef, targetZoomPosition)

  return (
    <>
      <color attach='background' args={['black']} />
      <OrbitControls ref={orbitControlsRef} />
      <AnimatedStars />
      <directionalLight
        ref={directionalLightRef}
        position={[0, 0, 10]}
        intensity={1.5}
        // color={0xff0000}
      />
      <directionalLight ref={directionalLightRefTwo} position={[0, 0, -10]} intensity={1.5}/>

      <PsycheAsteroid />
      {/*<Earth />*/}
    </>
  )
}

export default MainPsycheContainer
