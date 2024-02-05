import * as THREE from  'three';
import { OrbitControls } from '/three/threejs/build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        onWindowResize,
} from "/three/threejs/libs/util/util.js";

let scene, renderer, camera, material, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
renderer.setClearColor("rgb(30, 30, 40)");
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

let loader = new THREE.TextureLoader();
var cubeGeometry = new THREE.BoxGeometry(5,5,5,5);
let cubeMaterial = [
  
  setMaterial('/three/threejs/assets/textures/tiles.jpg', 1,1),
  setMaterial('/three/threejs/assets/textures/tiles.jpg', 2,2),
  setMaterial('/three/threejs/assets/textures/tiles.jpg', 3,3),
  setMaterial('/three/threejs/assets/textures/tiles.jpg', 3,1),
  setMaterial('/three/threejs/assets/textures/tiles.jpg', 6,2),
  setMaterial('/three/threejs/assets/textures/tiles.jpg', 1,3),

]
var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.position.set(0,2.5,0)
scene.add(cube);

function setMaterial(file, i,j, color = 'rgb(255,255,255)'){
  let mat = new THREE.MeshBasicMaterial({ map: loader.load(file), color:color});
  let pos = 0.3352
  mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
  mat.map.minFilter = mat.map.magFilter = THREE.LinearFilter;
  mat.map.repeat.set(0.325, 0.315);
  mat.map.offset.set(pos*j, pos*i);
  return mat;
}

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}