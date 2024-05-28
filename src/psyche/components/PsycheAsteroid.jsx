

import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {useFrame} from '@react-three/fiber'
import { ROTATION_SPEED} from './constants';
import ItemHotspots from './Buttons/ItemHotspot';
import { useContext } from 'react';
import {GlobalStateContext} from '../utils/useContext';
import { calculateSpeedByRefreshRate } from '../utils/useCameraZoom';



const PsycheAsteroid =  ({ psycheRef, visible, distanceFactor }) => {
	
	const obj = useLoader(OBJLoader, '	/assets/psyche.obj')
	const {isAsteroidSpinning, isModalOpen, showNotebook, showTravelAnimation, showHotspot, setShowHotspot, refreshRate}= useContext(GlobalStateContext);
    
	const speed = calculateSpeedByRefreshRate(refreshRate.refreshRate);
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
		if (isAsteroidSpinning){
			psycheRef.current.rotation.z += speed/60;
			
		}
		
	})

	return (
	<group ref={psycheRef} visible={visible}>
		  {!showTravelAnimation && visible && !isModalOpen && !showNotebook && showHotspot && <ItemHotspots distanceFactor={distanceFactor} />}
			<mesh  geometry={geometry} scale={2} frustumCulled={false} >
				<meshPhysicalMaterial color="gray" />
			</mesh>
	</group>

	)
}

export default PsycheAsteroid