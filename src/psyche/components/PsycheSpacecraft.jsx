import { useLoader, useFrame } from '@react-three/fiber'
import { useMemo, useEffect } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Html } from '@react-three/drei'
import { useRef } from 'react'
import { useContext } from 'react';
import { GlobalStateContext } from '../utils/useContext';
import * as THREE from 'three';
import { useTimer } from 'use-timer';
import SpacecraftHotspots from './Buttons/SpacecraftHotspot';

import { spacecraftFacts, sumPercentage } from './constants';


const PsycheSpacecraft = ({ scref, target, distanceFactor }) => {
  const obj = useLoader(OBJLoader, '/assets/psyche_spacecraft.obj')
  const iconRef = useRef()

  const { 
		setCurrentFactIndex, 
		factList, 
		isModalOpen, 
		setIsModalOpen,
		showAsteroid,
		showNotebook, 
		isMoving, 
		showSpacecraft, 
		isLaunched, 
		progressValue, 
		setProgressValue 
	} = useContext(GlobalStateContext);

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
	
	const { time, start, pause, reset, status } = useTimer({
		step: 0.0025,
		interval: 1,
	});
	
	useFrame(({clock}) => {
		if (isMoving) {
			start();
			//scref.current.position.x = Math.sin(clock.getElapsedTime()*0.8) * 10
			//scref.current.position.z = Math.cos(clock.getElapsedTime()*0.8) * 10
			scref.current.position.x = Math.sin(time*0.8) * 10
			scref.current.position.z = Math.cos(time*0.8) * 10
			
			const direction = new THREE.Vector3();
			target.current.getWorldPosition(direction);
			direction.sub(scref.current.position).normalize();

			scref.current.rotation.setFromRotationMatrix(
				new THREE.Matrix4().lookAt(direction, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0))
			);
			scref.current.rotateY(Math.PI / 2);

		}
		else{
			pause();
		}	
	})

  return (
    <group ref={scref} rotation={[0, 30, 0]}>
      <mesh geometry={geometry} scale={0.01} frustumCulled={false} visible={showSpacecraft}>
        <meshPhysicalMaterial color="pink" />
      </mesh>
      {isLaunched && !showAsteroid && !isModalOpen && !showNotebook && <SpacecraftHotspots distanceFactor={distanceFactor} />}
    </group>
  )
}

export default PsycheSpacecraft
