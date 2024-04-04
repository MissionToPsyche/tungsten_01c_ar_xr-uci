

import { useLoader, useFrame } from '@react-three/fiber'
import { useMemo } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three';


const PsycheSpacecraft = ({scref , target, isMoving}) => {
	const obj = useLoader(OBJLoader, '/assets/psyche_spacecraft.obj')

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
		<mesh ref={scref} geometry={geometry}  scale={0.01} frustumCulled={false}>
			<meshPhysicalMaterial color="pink" />
		</mesh>
	)
}

export default PsycheSpacecraft