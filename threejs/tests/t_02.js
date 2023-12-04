import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../build/jsm/loaders/GLTFLoader.js';
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
camera = initCamera(new THREE.Vector3(0, 10, 8)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
material.color.setHex( 0x61b645 ); // set material color
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

const loader = new GLTFLoader();

loader.load( '../models/fbi.glb', function ( gltf ) {
  console.log(gltf)
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

// Creating light
light = initDefaultBasicLight(scene);


// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper(15);
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(30, 30)
plane.receiveShadow = true
scene.add(plane);

// create a character


// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Importando modelo 3D");
  controls.add("Importando modelo 3D no formato .glb");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}