import * as THREE from 'three';

export const animateCameraZoomIn = (camera, targetRef, distance, callback) => {
  
  let zoomSpeed = 5;
  
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

export const animateCameraZoomOut = (orbitControlsRef, camera, distance, callback, callback2) => {
  
  let zoomSpeed = 5;
  const targetPosition = new THREE.Vector3(0, 0, distance);
  
  function updatePosition() {

    const currentDistance = camera.position.distanceTo(targetPosition);
    const startPosition = camera.position.clone();
    const direction = targetPosition.clone().sub(startPosition).normalize();
    const step = direction.multiplyScalar(zoomSpeed);
    
    
    if (callback2){
      callback2();
    }
    
    if (currentDistance <= 0.1) {
      orbitControlsRef.current.enableZoom = true;
      orbitControlsRef.current.enableRotate = true;
      
      if (callback){
        callback();
      }
      //setTimeout(() =>{
       
      //  orbitControlsRef.current.enableZoom = true;
      //  orbitControlsRef.current.enableRotate = true;
        
      //  if (callback){
      //    callback();
      //  }
      //}, 500);

      
      
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