import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './TravelStars.css'; // Ensure you have the corresponding CSS file


const StarryBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, stars, geom, starMaterial;
		
					
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
			
			//// Add a 3D object (e.g., a cube)
			//const geometry = new THREE.BoxGeometry(50, 50, 50);
			//const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			//const cube = new THREE.Mesh(geometry, material);
			//cube.position.set(0, 0, 0);
			//scene.add(cube);
			
			//const light1 = new THREE.DirectionalLight(0xffffff, 0.7)
			//light1.position.set(0, 0, 10)
			//scene.add(light1)
	
			//const light2 = new THREE.DirectionalLight(0xffffff, 0.7)
			//light2.position.set(0, 0, -10)
			//scene.add(light2)
	
			//const light3 = new THREE.DirectionalLight(0xffffff, 0.3)
			//light3.position.set(0, 10, 0)
			//scene.add(light3)
	
			//const light4 = new THREE.DirectionalLight(0xffffff, 0.3)
			//light4.position.set(0, -10, 0)
			//scene.add(light4)
	
			//const light5 = new THREE.DirectionalLight(0xffffff, 0.5)
			//light5.position.set(10, 0, 0)
			//scene.add(light5)
	
			//const light6 = new THREE.DirectionalLight(0xffffff, 0.5)
			//light6.position.set(-10, 0, 0)
			//scene.add(light6)
			
			//var mesh = null;

			//var mtlLoader = new MTLLoader();
			//mtlLoader.setPath( '/assets/' );
			//mtlLoader.load( 'spacecraft.mtl', function( materials ) {

			//	materials.preload();

			//	var objLoader = new OBJLoader();
			//	objLoader.setMaterials( materials );
			//	objLoader.setPath( "/assets/" );
			//	objLoader.load( 'spacecraft.obj', function ( object ) {

			//		mesh = object;
			//		mesh.position.y = -10;
			//		mesh.position.x = 0;
			//		mesh.position.z = 0;
			//		mesh.scale.set(0.3, 0.3, 0.3);
			//		mesh.rotateY(Math.PI / 2)
			//		scene.add( mesh );

			//	} );

			//} );
			

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
				va[2 * line_index] += 0.03;
				va[2 * line_index + 1] += 0.025;
				
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
