import * as THREE from  'three';
import { OrbitControls } from '/three/threejs/build/jsm/controls/OrbitControls.js';
import GUI from '/three/threejs/libs/util/dat.gui.module.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "/three/threejs/libs/util/util.js";

let scene, renderer, camera, material, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 20, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
material.color.setHex( 0x61b645 ); // set material color
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.


// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper(15);
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(30, 30)
scene.add(plane);

// create 3 cubes with different sizes

  let sphereGeometry = new THREE.SphereGeometry(1);
  let sphere = new THREE.Mesh(sphereGeometry, material);
  let sphere2 = new THREE.Mesh(sphereGeometry, material);
  sphere.position.set(-10,1,-5);
  sphere2.position.set(-10,1,5);
 
  scene.add(sphere);
  scene.add(sphere2);

 const lerpConfig = {
  destination1: new THREE.Vector3(10,1,-5),
  destination2: new THREE.Vector3(10,1,5),
  alpha1: 0.03,
  alpha2: 0.01,
  move1: false,
  move2: false
 }

 const reset = () => {
  lerpConfig.destination1 = {x: -10, y:1, z:-5};
  lerpConfig.destination2 = {x: -10, y:1, z:5};
  
 }

// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Exercício 09:");
  controls.addParagraph();
  controls.add("Movimentação das esferas com animação");
  controls.show();

document.getElementById('btnSphere1').addEventListener('click', () => {
  lerpConfig.destination1 = {x: 10, y:1, z:-5};
  lerpConfig.move1 = true;
})
document.getElementById('btnSphere2').addEventListener('click', () => {
  lerpConfig.destination2 = {x: 10, y:1, z:5};
  lerpConfig.move2 = true;
})
document.getElementById('btnReset').addEventListener('click', () => {
  
  reset()

})

render();
function render()
{

  lerpConfig.move1 ? sphere.position.lerp(lerpConfig.destination1,lerpConfig.alpha1) : 0;
  lerpConfig.move2 ? sphere2.position.lerp(lerpConfig.destination2,lerpConfig.alpha2) : 0;
  
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}