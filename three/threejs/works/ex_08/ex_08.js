import * as THREE from  'three';
import KeyboardState from '/three/threejs/libs/util/KeyboardState.js'
import {TeapotGeometry} from '/three/threejs/build/jsm/geometries/TeapotGeometry.js';
import {initRenderer, 
        initDefaultSpotlight,
        createGroundPlaneXZ,
        SecondaryBox, 
        onWindowResize} from "/three/threejs/libs/util/util.js";

let scene, renderer, light, camera, keyboard;
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // View function in util/utils
light = initDefaultSpotlight(scene, new THREE.Vector3(5.0, 5.0, 5.0)); // Use default light    
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
keyboard = new KeyboardState();

var groundPlane = createGroundPlaneXZ(10, 10, 40, 40); // width, height, resolutionW, resolutionH
scene.add(groundPlane);

// Create objects
createTeapot( 2.0,  0.4,  0.0, Math.random() * 0xffffff);
createTeapot(0.0,  0.4,  2.0, Math.random() * 0xffffff);  
createTeapot(0.0,  0.4, -2.0, Math.random() * 0xffffff);    

let camPos  = new THREE.Vector3(3, 4, 8);
let camUp   = new THREE.Vector3(0.0, 0.5, 0.0);
let camLook = new THREE.Vector3(0.0, 0.5, -1.0);
var message = new SecondaryBox("");

// Main camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.copy(camPos);
   camera.up.copy( camUp );
   camera.lookAt(camLook);

let cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
scene.add(cameraHolder);

render();

function updateCamera()
{
   // DICA: Atualize a câmera aqui!
   camera.position.copy(camPos);
   camera.lookAt(camLook);
   camera.up.copy( camUp );

   message.changeMessage("Pos: {" + camPos.x.toFixed(2) + ", " + camPos.y.toFixed(2) + ", " + camPos.z.toFixed(2) + "} " + 
                         "/ LookAt: {" + camLook.x.toFixed(2) + ", " + camLook.y.toFixed(2) + ", " + camLook.z.toFixed(2) + "}");
}

function keyboardUpdate() {
   const translateSpeed = 0.1;
   const rotateSpeed = 1;
   keyboard.update();
   
   // DICA: Insira aqui seu código para mover a câmera

   if(keyboard.pressed('up')) cameraHolder.rotateX(THREE.MathUtils.degToRad(rotateSpeed))
   if(keyboard.pressed('down')) cameraHolder.rotateX(THREE.MathUtils.degToRad(-rotateSpeed))
   if(keyboard.pressed('right')) cameraHolder.rotateY(THREE.MathUtils.degToRad(rotateSpeed))
   if(keyboard.pressed('left')) cameraHolder.rotateY(THREE.MathUtils.degToRad(-rotateSpeed))
   if(keyboard.pressed('e')) cameraHolder.rotateZ(THREE.MathUtils.degToRad(-rotateSpeed))
   if(keyboard.pressed('q')) cameraHolder.rotateZ(THREE.MathUtils.degToRad(rotateSpeed))
   
   if(keyboard.pressed('a')) cameraHolder.translateX(THREE.MathUtils.degToRad(-0.1))
   if(keyboard.pressed('d')) cameraHolder.translateX(THREE.MathUtils.degToRad(0.1))
   if(keyboard.pressed('w')) cameraHolder.translateZ(THREE.MathUtils.degToRad(-0.1))
   if(keyboard.pressed('s')) cameraHolder.translateZ(THREE.MathUtils.degToRad(0.1))
   
   
   
   updateCamera();
}

function createTeapot(x, y, z, color )
{
   var geometry = new TeapotGeometry(0.5);
   var material = new THREE.MeshPhongMaterial({color, shininess:"200"});
      material.side = THREE.DoubleSide;
   var obj = new THREE.Mesh(geometry, material);
      obj.castShadow = true;
      obj.position.set(x, y, z);
   scene.add(obj);
}

function render()
{
   requestAnimationFrame(render);
   keyboardUpdate();
   renderer.render(scene, camera) // Render scene
}