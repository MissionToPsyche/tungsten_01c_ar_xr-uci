

import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {useFrame} from '@react-three/fiber'
import { ROTATION_SPEED} from './constants';



const PsycheAsteroid =  ({ psycheRef }) => {
	
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
		psycheRef.current.rotation.y += ROTATION_SPEED
	})

	return (

		<mesh ref={psycheRef} geometry={geometry} scale={2} frustumCulled={false}>
			<meshPhysicalMaterial color="gray" />
		</mesh>
	)
}

export default PsycheAsteroid