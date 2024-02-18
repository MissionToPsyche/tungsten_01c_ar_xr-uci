

import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react';
//import { OBJLoader } from 'three/examples/jsm/Addons.js'
//import { OBJLoader } from 'three-stdlib';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'


//import { useTexture } from '@react-three/drei'

const PsycheAsteroid = () => {
	const obj = useLoader(OBJLoader, '/assets/psyche.obj')

	const geometry = useMemo(() => {
		let g;
		obj.traverse((c) => {
			if (c.type === "Mesh") {
				const _c = c ;
				g = _c.geometry;
			}
		});
		return g;
	}, [obj]);

	return (
		<mesh geometry={geometry} scale={0.04}>
			<primitive object={obj} />
			<meshPhysicalMaterial color="gray" />
		</mesh>
	)
}

export default PsycheAsteroid