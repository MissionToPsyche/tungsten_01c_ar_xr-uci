

import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {useFrame} from '@react-three/fiber'
import { ROTATION_SPEED} from './constants';
import ItemHotspots from './Buttons/ItemHotspot';
import { useContext } from 'react';
import {GlobalStateContext} from '../utils/useContext';



const PsycheAsteroid =  ({ psycheRef, visible, distanceFactor }) => {
	
	const obj = useLoader(OBJLoader, '	/assets/psyche.obj')
	const {isAsteroidSpinning, isModalOpen, showNotebook}= useContext(GlobalStateContext);
    

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
			psycheRef.current.rotation.z += 0.005;
			
		}
		
	})

	return (
	<group ref={psycheRef} visible={visible}>
		  {visible && !isModalOpen && !showNotebook && <ItemHotspots distanceFactor={distanceFactor} />}
			<mesh  geometry={geometry} scale={2} frustumCulled={false} >
				<meshPhysicalMaterial color="gray" />
			</mesh>
	</group>

	)
}

export default PsycheAsteroid