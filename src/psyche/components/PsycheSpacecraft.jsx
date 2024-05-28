import { useLoader, useFrame } from '@react-three/fiber'
import { useMemo, useEffect, useState } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Html } from '@react-three/drei'
import { useRef } from 'react'
import { useContext } from 'react';
import { GlobalStateContext } from '../utils/useContext';
import * as THREE from 'three';
import { useTimer } from 'use-timer';
import SpacecraftHotspots from './Buttons/SpacecraftHotspot';

import { spacecraftFacts, sumPercentage } from './constants';
import { calculateSpeedByRefreshRate } from '../utils/useCameraZoom';


const PsycheSpacecraft = ({ scref, target, distanceFactor }) => {
	const [model, setModel] = useState(null);
	const [materials, setMaterials] = useState(null);
	
  
	// Load the MTL file
	const loadedMaterials = useLoader(MTLLoader, '/assets/spacecraft.mtl');
	
	useEffect(() => {
	  if (loadedMaterials) {
		loadedMaterials.preload();
		setMaterials(loadedMaterials);
	  }
	}, [loadedMaterials]);
  
	useEffect(() => {
	  if (materials) {
		const loader = new OBJLoader();
		loader.setMaterials(materials);
		loader.load('/assets/spacecraft.obj', (obj) => {
		  setModel(obj);
		});
	  }
	}, [materials]);
	const iconRef = useRef()

	const { 
		startZooming,
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
		setProgressValue ,
		isStartClicked,
		refreshRate
	} = useContext(GlobalStateContext);
	
	const speed = calculateSpeedByRefreshRate(refreshRate.refreshRate);


	const geometry = useMemo(() => {
		if (model) {
			let g;
			model.traverse((c) => {
				if (c.type === "Mesh") {
				const _c = c;
				g = _c.geometry.center();
				}
			});
			return g;
			}
		}, [model]);
	
	const { time, start, pause, reset, status } = useTimer({
		step: 0.0025,
		interval: 1,
	});
	
	useFrame(({clock}) => {
		if (isMoving) {

			start();
			//scref.current.position.x = Math.sin(clock.getElapsedTime()*0.8) * 10
			//scref.current.position.z = Math.cos(clock.getElapsedTime()*0.8) * 10
			scref.current.position.x = Math.sin(time * speed * 2) * 10
			scref.current.position.z = Math.cos(time * speed * 2) * 10
			
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
      {model && (
        <primitive object={model} scale={0.01} frustumCulled={false} visible={showSpacecraft} />
      )}
      {isStartClicked && !showAsteroid && !isModalOpen && !showNotebook && (
        <SpacecraftHotspots distanceFactor={distanceFactor} />
      )}
    </group>
  )
}

export default PsycheSpacecraft
