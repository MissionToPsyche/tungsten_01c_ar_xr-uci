import React, { useRef } from 'react';

import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, MeshBasicMaterial } from 'three';
import {GlobalStateContext} from '../../utils/useContext';
import { useContext } from "react";
import { hotspots, sumPercentage } from '../constants';

const ItemHotspot = ({ position, scale, meshRotation, boxImage, imageUrl, title }) => {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, imageUrl);
    
    const { currentFactIndex, setCurrentFactIndex, factList, toolList, progressValue, setProgressValue} = useContext(GlobalStateContext);
    
    //const sumPercentage = 100/(factList.length+toolList.length)
    
    //console.log("sumPercentage: " + sumPercentage)
    
    const handleIconClick = () => {
      console.log("clicked on icon" + title);
      const imageToShow = boxImage;
      for (let i=0; i<factList.length; i++){
        if (factList[i].title === title){
          if (progressValue < 100 && !factList[i].isExplored){
            setProgressValue(progressValue + sumPercentage);
          }
          factList[i].isExplored = true;
          setCurrentFactIndex(i);
        }
      }
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
  
