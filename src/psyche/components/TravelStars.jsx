import React, { useEffect, useRef, useContext } from 'react';
import * as THREE from 'three';
import {GlobalStateContext} from '../utils/useContext';
import { calculateSpeedByRefreshRate } from '../utils/useCameraZoom';

import './TravelStars.css'; // Ensure you have the corresponding CSS file


const StarryBackground = () => {
  const mountRef = useRef(null);
	
	const {
    refreshRate,
    } = useContext(GlobalStateContext);
		
		const speed = calculateSpeedByRefreshRate(refreshRate.refreshRate);

  useEffect(() => {
    let scene, camera, renderer, geom;
		
					
		let LINE_COUNT = 2000;
		geom = new THREE.BufferGeometry();
		geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6 * LINE_COUNT ), 3));
		geom.setAttribute('velocity', new THREE.BufferAttribute(new Float32Array(2 * LINE_COUNT ), 3));
		
		let pos = geom.getAttribute('position');
		let pa = pos.array;
		let vel = geom.getAttribute('velocity');
		let va = vel.array;

    function init() {
      scene = new THREE.Scene();
			
			

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500);
      camera.position.z = 300;
      camera.rotation.x = 0;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
			
			
			for (let line_index = 0; line_index < LINE_COUNT; line_index++) {
				let x = Math.random() * 400 - 200;
				let y = Math.random() * 200 - 100;
				let z = Math.random() * 500 - 100;
				
				let xx = x
				let yy = y
				let zz = z
				
				//line start
				pa[6 * line_index] = x;
				pa[6 * line_index + 1] = y;
				pa[6 * line_index + 2] = z;
				//line end
				pa[6 * line_index + 3] = xx;
				pa[6 * line_index + 4] = yy;
				pa[6 * line_index + 5] = zz;
				
				va[2 * line_index] = va[2 * line_index + 1] = 0;
			}


      //debugger;
			let mat = new THREE.LineBasicMaterial({color: 0xffffff});
			let lines = new THREE.LineSegments(geom, mat);
			
			scene.add(lines);			

      window.addEventListener('resize', onWindowResize, false);

      animate();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
			
      for (let line_index = 0; line_index < LINE_COUNT; line_index++) {
				va[2 * line_index] += speed - (speed/1.15);
				va[2 * line_index + 1] += (speed) - (speed/1.1);
				
				pa[6 * line_index + 2] += va[2 * line_index];
				pa[6 * line_index + 5] += va[2 * line_index + 1];
				
				if (pa[6 * line_index + 5] > 200) {
					let z = Math.random() * 200 - 100;
					pa[6 * line_index + 2] = z;
					pa[6 * line_index + 5] = z;
					va[2 * line_index] = 0;
					va[2 * line_index + 1] = 0;
				}
			}
			
			pos.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    init();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div>
      <div ref={mountRef}></div>
    </div>
  );
};

export default StarryBackground;
