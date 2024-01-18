import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, material, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 50, 75)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
material.color.setHex( 0x61b645 ); // set material color
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper(45);
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(75, 75)
scene.add(plane);

// create 3 objects

for(let i = 0; i < 3; i++){

  let objGeometry = (i == 0) ? new THREE.SphereGeometry(5) : ((i == 1) ? new THREE.BoxGeometry(10, 10, 10) : new THREE.CylinderGeometry(5, 5, 10));
  let obj = new THREE.Mesh(objGeometry, material);
  obj.position.set((i-1)*20, 10/2, 0.0)
  scene.add(obj);
}


// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Exercício 02:");
  controls.addParagraph();
  controls.add("Criação de três objetos");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}