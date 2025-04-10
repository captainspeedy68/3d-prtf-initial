import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Create the scene, camera, and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

// Create a torus knot geometry and material
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Lights for the scene
const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Controls for orbiting the camera
const controls = new OrbitControls(camera, renderer.domElement);

// Function to add stars to the scene
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

// Background texture
const spaceTexture = new THREE.TextureLoader().load('space2.jpg');
scene.background = spaceTexture;

// Avatar (Odin)
const odinTexture = new THREE.TextureLoader().load('odin.png');
const odin = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: odinTexture })
);
scene.add(odin);

// Jupiter (planet)
const jupiterTexture = new THREE.TextureLoader().load('Jupiter.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({ map: jupiterTexture, normalMap: normalTexture })
);
scene.add(jupiter);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the torus knot
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  controls.update(); // Update controls
  renderer.render(scene, camera); // Render the scene from the perspective of the camera
}

// Start animation loop
animate();
 