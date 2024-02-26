export const animateCameraZoom = (setShowSpacecraft, psycheSpacecraftRef, camera) => {
  let zoomSpeed = 1.24;
  
  function updatePosition() {
    const targetPosition = psycheSpacecraftRef.current.position.clone();
    const currentDistance = camera.position.distanceTo(targetPosition);
    const startPosition = camera.position.clone();
    const direction = targetPosition.clone().sub(startPosition).normalize();
    const step = direction.multiplyScalar(zoomSpeed);
    
    if (currentDistance <= 0.1) {
      setShowSpacecraft(false);

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