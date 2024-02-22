

import { useLoader, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three';


const PsycheSpacecraft = ({target}) => {
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
	
	const moonRef = useRef()
	
	useFrame(({clock}) => {
		moonRef.current.position.x = Math.sin(clock.getElapsedTime()*0.4) * 10
		moonRef.current.position.z = Math.cos(clock.getElapsedTime()*0.4) * 10
		
		// Calculate the direction from the moon to the target (Psyche asteroid)
    const direction = new THREE.Vector3();
    target.current.getWorldPosition(direction);
    direction.sub(moonRef.current.position).normalize();

    // Set the moon's rotation to face the target while spinning
    moonRef.current.rotation.setFromRotationMatrix(
      new THREE.Matrix4().lookAt(direction, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0))
    );
		
		moonRef.current.rotateY(Math.PI / 2);
	})

	return (
		<mesh ref={moonRef} geometry={geometry}  scale={0.01}  position={[2,0,0]}  frustumCulled={false}>
			<meshPhysicalMaterial color="pink" />
		</mesh>
	)
}

export default PsycheSpacecraft