import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export const useCameraZoom = (orbitControlsRef, targetZoomPosition) => {
  const [startZoom, setStartZoom] = useState(true);

  useFrame(() => {
    if (startZoom && orbitControlsRef.current) {
      const camera = orbitControlsRef.current.object;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZoomPosition, 0.01);

      // Stop the zooming effect
      if (Math.abs(camera.position.z - targetZoomPosition) < 0.05) {
        setStartZoom(false); 
      }
    }
  });

  return { startZoom, setStartZoom };
};