import * as THREE from 'three';

export const animateCameraZoomIn = (camera, targetRef, distance, callback) => {
  
  let zoomSpeed = 0.5;
  
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
  
  let zoomSpeed = 0.5;
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


export function getRefreshRate(callback) {
  let frameTimes = [];
  let lastFrameTime;
  let measurementStartTime;

  function measureRefreshRate() {
      requestAnimationFrame(function(timestamp) {
          if (!measurementStartTime) {
              measurementStartTime = timestamp;
          }

          if (timestamp - measurementStartTime < 2000) { // Measure over 5 seconds
              if (lastFrameTime) {
                  let frameTime = timestamp - lastFrameTime;
                  frameTimes.push(frameTime);
              }
              lastFrameTime = timestamp;
              measureRefreshRate();
          } else {
              if (frameTimes.length > 0) {
                  let totalFrameTime = frameTimes.reduce((acc, val) => acc + val, 0);
                  let averageFrameTime = totalFrameTime / frameTimes.length;
                  let refreshRate = Math.round(1000 / averageFrameTime);
                  callback(refreshRate);
              }
              // Reset variables for the next measurement
              lastFrameTime = null;
              measurementStartTime = null;
          }
      });
  }

  // Start measuring
  measureRefreshRate();
}