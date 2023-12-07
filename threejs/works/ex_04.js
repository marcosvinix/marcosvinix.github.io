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
let plane = createGroundPlaneXZ(30, 30)
scene.add(plane);

// create 3 objects

let cubeGeometry = new THREE.BoxGeometry(11,0.3,6);
let cube =  new THREE.Mesh(cubeGeometry,material);
scene.add(cube);

let coords = [{'x':5,'y':-1.5,'z':2},{'x':5,'y':-1.5,'z':-2},{'x':-5,'y':-1.5,'z':2},{'x':-5,'y':-1.5,'z':-2}]


for(let i = 0; i < 4; i++){

    let CylinderGeometry = new THREE.CylinderGeometry(0.2,0.2,3);
    let cylinder = new THREE.Mesh(CylinderGeometry,material);
    cube.add(cylinder);
    cylinder.translateZ(coords[i].z);
    cylinder.translateX(coords[i].x);
    cylinder.translateY(coords[i].y);
}

cube.position.set(0,3.03,0)


// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Exercício 04:");
  controls.addParagraph();
  controls.add("Criação de uma mesa");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}