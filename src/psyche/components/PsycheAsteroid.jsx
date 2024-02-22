

import { useLoader } from '@react-three/fiber'
import { useMemo, useRef } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import PsycheSpacecraft from './PsycheSpacecraft';
import {useFrame} from '@react-three/fiber'
import {useRef} from 'react'


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
		<group>
			<mesh ref={psycheRef} geometry={geometry} scale={0.5} frustumCulled={false}>
				<meshPhysicalMaterial color="gray" />
			</mesh>
			<PsycheSpacecraft target={psycheRef}/>	
		</group>

		//<mesh ref={psycheRef} geometry={geometry} scale={2} frustumCulled={false}>
		//	<meshPhysicalMaterial color="gray" />
		//</mesh>
	)
}

export default PsycheAsteroid