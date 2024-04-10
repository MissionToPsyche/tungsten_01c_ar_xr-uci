import * as THREE from 'three';

export const animateCameraZoomIn = (camera, targetRef, distance, callback) => {
  
  let zoomSpeed = 1.235;
  
  function updatePosition() {
    const targetPosition = targetRef.current.position.clone();
    const currentDistance = camera.position.distanceTo(targetPosition);
    const startPosition = camera.position.clone();
    const direction = targetPosition.clone().sub(startPosition).normalize();
    const step = direction.multiplyScalar(zoomSpeed);
    
    if (currentDistance <= distance) {
      callback();
    }
    else {
      camera.position.add(step);
      requestAnimationFrame(updatePosition);
    }
    
    if (zoomSpeed > 0.25){
      zoomSpeed -= 0.04;
    }
  }
  
  updatePosition();
};

export const animateCameraZoomOut = (orbitControlsRef, camera) => {
  
  let zoomSpeed = 1.235;
  const targetPosition = new THREE.Vector3(0, 0, 45);
  
  function updatePosition() {

    const currentDistance = camera.position.distanceTo(targetPosition);
    const startPosition = camera.position.clone();
    const direction = targetPosition.clone().sub(startPosition).normalize();
    const step = direction.multiplyScalar(zoomSpeed);
    
    if (currentDistance <= 0.1) {
      orbitControlsRef.current.enableZoom = true;
      orbitControlsRef.current.enableRotate = true;
      
    }
    else {
      camera.position.add(step);
      requestAnimationFrame(updatePosition);
    }
    
    if (zoomSpeed > 0.15){
      zoomSpeed -= 0.08;
    }
  }
  
  updatePosition();
};