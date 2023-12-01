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
camera = initCamera(new THREE.Vector3(0, 20, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
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

for(let i = 0; i < 3; i++){
  let size = Math.floor(Math.random()*5+1);
  let cubeGeometry = new THREE.BoxGeometry(size, size, size);
  let cube = new THREE.Mesh(cubeGeometry, material);
  cube.position.set((i-1)*6, size/2, 0.0)
  scene.add(cube);
}


// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Exercicio 01:");
  controls.addParagraph();
  controls.add("Criação de três cubos de diferentes tamanhos");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}