

import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react';
//import { OBJLoader } from 'three/examples/jsm/Addons.js'
//import { OBJLoader } from 'three-stdlib';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {useFrame} from '@react-three/fiber'
import {useRef} from 'react'


//import { useTexture } from '@react-three/drei'

const PsycheAsteroid = () => {
	
	const psycheRef = useRef()
	
	const obj = useLoader(OBJLoader, '	/assets/psyche.obj')

	const geometry = useMemo(() => {
		let g;
		obj.traverse((c) => {
			if (c.type === "Mesh") {
				const _c = c ;
				g = _c.geometry.center();
				
				
				
			}
		});
		
		return g;
	}, [obj]);
	
	
	useFrame(() => {
		psycheRef.current.rotation.y += 0.003
	})


	return (
		<mesh ref={psycheRef} geometry={geometry} scale={2} frustumCulled={false}>
			<meshPhysicalMaterial color="gray" />
		</mesh>
	)
}

export default PsycheAsteroid