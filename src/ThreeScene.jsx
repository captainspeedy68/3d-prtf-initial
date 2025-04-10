import './index.css';
import * as THREE from 'three';

// always in need of scenes camera and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;// this i added

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);


const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
const material = new THREE.MeshStandardMaterial( { color: 0xffff00} ); 
const torusKnot = new THREE.Mesh( geometry, material ); scene.add( torusKnot );

scene.add(torusKnot)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

function animate(){
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;  
  torusKnot.rotation.z += 0.01;


  renderer.render(scene, camera);
}

animate()


const ThreeScene = () => {
    // return (
    //   <div>
    //     <canvas id="bg" />
    //   </div>
    // );

    return null; // it turns out I have already added the a canvas tag in index.html
  };
  

  export default ThreeScene;