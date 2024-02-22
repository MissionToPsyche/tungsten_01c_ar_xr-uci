

import { useLoader, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react';
//import { OBJLoader } from 'three/examples/jsm/Addons.js'
//import { OBJLoader } from 'three-stdlib';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three';



//import { useTexture } from '@react-three/drei'

const Moon = ({target}) => {
	const obj = useLoader(OBJLoader, '/assets/psyche.obj')

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
		moonRef.current.position.x = Math.sin(clock.getElapsedTime()*0.5) * 1.5
		moonRef.current.position.z = Math.cos(clock.getElapsedTime()*0.5) * 1.5
		//moonRef.current.position.y += 0.002
		
		// Calculate the direction from the moon to the target (Psyche asteroid)
    const direction = new THREE.Vector3();
    target.current.getWorldPosition(direction);
    direction.sub(moonRef.current.position).normalize();

    // Set the moon's rotation to face the target while spinning
    moonRef.current.rotation.setFromRotationMatrix(
      new THREE.Matrix4().lookAt(direction, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0))
    );
	})

	return (
		//<mesh geometry={geometry} scale={0.04}>
		//	<primitive object={obj} />
		//	<meshPhysicalMaterial color="gray" />
		//</mesh>
		<mesh ref={moonRef} geometry={geometry}  scale={0.2}  position={[2,0,0]}  frustumCulled={false}>
			<meshPhysicalMaterial color="gray" />
		</mesh>
	)
}

export default Moon