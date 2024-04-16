import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, MeshBasicMaterial } from 'three';
import {GlobalStateContext} from '../../utils/useContext';
import { useContext } from "react";

import { hotspots } from '../constants';

const ItemHotspot = ({ position, scale, meshRotation, boxImage, imageUrl, title }) => {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, imageUrl);
    
    const { currentImage, setCurrentImage, factList} = useContext(GlobalStateContext);
    
    const handleIconClick = () => {
      const imageToShow = boxImage;
      setCurrentImage(imageToShow); // Show the iron info box, or hide if already shown
      for (let i=0; i<factList.length; i++){
        if (factList[i].title === title){
          factList[i].isExplored = true;
        }
      }

      //factList[0].isExplored = true;
    };
    
    return (
      <mesh position={position} ref={meshRef} onClick={handleIconClick} scale={scale}>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshBasicMaterial map={texture} /> {/* Updated material */}
      
      {meshRef.current && meshRef.current.rotation.set(...meshRotation)}
    </mesh>
    );
  };
  
  
  const ItemHotspots = () => {
    
    return (
      <>
      {
        hotspots.map(
          (hotspot, index) => (
            <ItemHotspot key={index} {...hotspot} />
          )
        )
      }
      </>
    )
    
  };
  
  
  export default ItemHotspots;
  
