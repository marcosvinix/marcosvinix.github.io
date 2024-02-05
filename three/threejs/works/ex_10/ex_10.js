import * as THREE from 'three';
import { OrbitControls } from '/three/threejs/build/jsm/controls/OrbitControls.js';
import GUI from '/three/threejs/libs/util/dat.gui.module.js';
import {
  initRenderer,
  initCamera,
  initDefaultBasicLight,
  setDefaultMaterial,
  InfoBox,
  onWindowResize,
  createGroundPlaneXZ
} from "/three/threejs/libs/util/util.js";

let scene, renderer, camera, material, light, orbit;; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 20, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
material.color.setHex(0x61b645); // set material color
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.


// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper(15);
scene.add(axesHelper);

// create the ground plane
let plane = createGroundPlaneXZ(30, 30)
scene.add(plane);

// create 3 cubes with different sizes

let sphereGeometry = new THREE.SphereGeometry(1);
let sphere = new THREE.Mesh(sphereGeometry, material);
let sphere2 = new THREE.Mesh(sphereGeometry, material);
sphere.position.set(-10, 1, -5);
sphere2.position.set(-10, 1, 5);

scene.add(sphere);
scene.add(sphere2);

let initialPositionSphere = new THREE.Vector3(-10, 1, -5);
let initialPositionSphere2 = new THREE.Vector3(-10, 1, 5);

let targetPositionSphere = initialPositionSphere.clone();
let targetPositionSphere2 = initialPositionSphere2.clone();

let isAnimating = false;

// Use this to show information onscreen
let controls = new InfoBox();
controls.add("Exercício 10:");
controls.addParagraph();
controls.add("Movimentação das esferas com animação, sem slerp");
controls.show();

// Mapeamento dos botoes
document.getElementById('btnSphere1').addEventListener('click', () => {
  targetPositionSphere = new THREE.Vector3(10, 1, -5);
  isAnimating = true;
})
document.getElementById('btnSphere2').addEventListener('click', () => {
  targetPositionSphere2 = new THREE.Vector3(10, 1, 5);
  isAnimating = true;
})
document.getElementById('btnReset').addEventListener('click', () => {
  targetPositionSphere = initialPositionSphere.clone();
  targetPositionSphere2 = initialPositionSphere2.clone();
  isAnimating = true;
})

render();
function render() {

  if (isAnimating) {

    if (sphere.position.distanceTo(targetPositionSphere) > 0.1) {
      let direction = targetPositionSphere.clone().sub(sphere.position).normalize();
      sphere.translateX(direction.x * 0.06);
    }

    if (sphere2.position.distanceTo(targetPositionSphere2) > 0.1) {
      let direction2 = targetPositionSphere2.clone().sub(sphere2.position).normalize();
      sphere2.translateX(direction2.x * 0.04);
    }

    if (sphere.position.distanceTo(targetPositionSphere) < 0.1 &&
      sphere2.position.distanceTo(targetPositionSphere2) < 0.1) {
      isAnimating = false;
    }
  }

  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}