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
material.color.setHex( 0x61b645 ); // set material color
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Creating light
light = new THREE.DirectionalLight( 0xffffff, 1 ); // Create a light
light.position.set( 10, 7, 9 )
light.castShadow = true;
light.shadowDarkness = 1
scene.add( light );

document.addEventListener('keypress', (e) => {
  if(e.key == '1'){
    light.position.set(-10,7,9);
  }
  else if(e.key == '2'){
    light.position.set(10,7,-9);
  }
  else if(e.key == '3'){
    light.position.set(20,7,5);
  }
  else if(e.key == '4'){
    light.position.set(-2,16,4);
  }
  else if(e.key == '5'){
    light.position.set(8,12,10);
  }

})


// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper(15);
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(30, 30)
plane.receiveShadow = true
scene.add(plane);

// create a cube


let sizes = [];

for(let i = 0; i < 3; i++){
  let size = Math.floor(Math.random()*5+1);

  while(sizes.includes(size)){
    size = Math.floor(Math.random()*5+1)
  }

  sizes.push(size);
  let cubeGeometry = new THREE.BoxGeometry(size, size, size);
  let cube = new THREE.Mesh(cubeGeometry, material);
  cube.castShadow = true
  cube.position.set((i-1)*6, size/2, 0.0);
 
  scene.add(cube);
}

const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );


// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Luz direcional");
  controls.add("Utilize as teclas de 1-5 para diferentes posições da luz.");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}