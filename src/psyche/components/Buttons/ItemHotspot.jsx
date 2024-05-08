import React, { useRef } from 'react';

import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, MeshBasicMaterial } from 'three';
import {GlobalStateContext} from '../../utils/useContext';
import { useContext } from "react";
import { hotspots, sumPercentage } from '../constants';
import { Html } from '@react-three/drei';

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
      <Html position={position} distanceFactor={12} ref={meshRef}>
					<div className="icon" onClick={() => {handleIconClick(title)}}>
					</div>
    	</Html>
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
  
