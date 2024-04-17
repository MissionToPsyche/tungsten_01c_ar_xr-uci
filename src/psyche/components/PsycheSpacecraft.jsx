

import { useLoader, useFrame } from '@react-three/fiber'
import { useMemo } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three';


const PsycheSpacecraft = ({scref , target, isMoving, visible}) => {
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
	
	useFrame(({clock}) => {
		if (isMoving) {
			scref.current.position.x = Math.sin(clock.getElapsedTime()*0.8) * 10
			scref.current.position.z = Math.cos(clock.getElapsedTime()*0.8) * 10
			
			const direction = new THREE.Vector3();
			target.current.getWorldPosition(direction);
			direction.sub(scref.current.position).normalize();

			scref.current.rotation.setFromRotationMatrix(
				new THREE.Matrix4().lookAt(direction, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0))
			);
			scref.current.rotateY(Math.PI / 2);
		}
		
	})
	
	
	return (
		<mesh ref={scref} geometry={geometry}  scale={0.01} frustumCulled={false} visible={visible}
		rotation={[0, 30, 0]}>
			<meshPhysicalMaterial color="pink" />
		</mesh>
	)
}

export default PsycheSpacecraft