import * as THREE from  'three';
import { OrbitControls } from '/three/threejs//build/jsm/controls/OrbitControls.js';
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

// create 9 cubes

for(let i = 0; i < 3; i++){
  for(let j = 0; j < 3; j++){
    let size = Math.floor(Math.random()*3+1);
    let cubeGeometry = new THREE.BoxGeometry(size, size, size);
    let cube = new THREE.Mesh(cubeGeometry, material);
    cube.position.set((i-1)*6, size/2, (j-1)*6)
    scene.add(cube);
  }
}


// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Exercício 03:");
  controls.addParagraph();
  controls.add("Criação de nove cubos de forma iterativa");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}

