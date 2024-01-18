import * as THREE from  'three';
import { OrbitControls } from '/three/threejs/build/jsm/controls/OrbitControls.js';
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
let plane = createGroundPlaneXZ(25, 25)
scene.add(plane);

// create 3 objects



for(let i = 0; i < 12; i++){

    let raio = 8;
    let angle = (i / 12) * Math.PI * 2;
    let x = Math.cos(angle) * raio;
    let z = Math.sin(angle) * raio;

    let SphereGeometry = new THREE.SphereGeometry(0.5);
    let sphere = new THREE.Mesh(SphereGeometry,material);

    plane.add(sphere);
    
    sphere.translateX(x);
    sphere.translateY(z);
    sphere.translateZ(0.5)
}


// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Exercício 05:");
  controls.addParagraph();
  controls.add("Criação de esferas em posições diferentes.");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}