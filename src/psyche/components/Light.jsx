import { useRef } from 'react'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'


const Light  = () => {
	
	const directionalLightRef1 = useRef()
  const directionalLightRef2= useRef()
	const directionalLightRef3 = useRef()
  const directionalLightRef4 = useRef()
  useHelper(directionalLightRef1, THREE.DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRef2, THREE.DirectionalLightHelper, 1, 'hotpink')
	useHelper(directionalLightRef3, THREE.DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRef4, THREE.DirectionalLightHelper, 1, 'hotpink')
	
	
	return (
		<>
		  <directionalLight
        ref={directionalLightRef1}
        position={[0, 0, 10]}
        intensity={0.7}
      />
      <directionalLight ref={directionalLightRef2} position={[0, 0, -10]} intensity={0.7}/>
      
      <directionalLight
        ref={directionalLightRef3}
        position={[0, 10, 0]}
        intensity={0.7}
      />
      <directionalLight
        ref={directionalLightRef4}
        position={[0, -10, 0]}
        intensity={0.7}
      /></>
	)
}

export default Light;