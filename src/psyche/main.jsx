import { OrbitControls, useHelper } from '@react-three/drei'
import AnimatedStars from './components/AnimatedStars'
import { useRef } from 'react'
import Earth from './components/Earth'
import * as THREE from 'three'
import PsycheAsteroid from './components/PsycheAsteroid'

const MainPsycheContainer = () => {
  const directionalLightRef = useRef()
  const directionalLightRefTwo = useRef()
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink')
  return (
    <>
      <color attach='background' args={['black']} />
      <OrbitControls />
      <AnimatedStars />
      <directionalLight
        ref={directionalLightRef}
        position={[0, 0, 10]}
        intensity={1.5}
        // color={0xff0000}
      />
      <directionalLight ref={directionalLightRefTwo} position={[0, 0, -10]} intensity={1.5}/>

      <PsycheAsteroid />
      {/*<Moon />*/}
    </>
  )
}

export default MainPsycheContainer
