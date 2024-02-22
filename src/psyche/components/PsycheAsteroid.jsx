

import { useLoader } from '@react-three/fiber'
import { useMemo, useRef } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import PsycheSpacecraft from './PsycheSpacecraft';


const PsycheAsteroid = () => {
	const obj = useLoader(OBJLoader, '/assets/psyche.obj')
	const psycheRef = useRef()
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

	return (
		<group>
			<mesh ref={psycheRef} geometry={geometry} scale={0.5}>
				<meshPhysicalMaterial color="gray" />
			</mesh>
			<PsycheSpacecraft target={psycheRef}/>	
		</group>

	)
}

export default PsycheAsteroid