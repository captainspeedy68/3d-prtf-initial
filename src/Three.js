import './index.css';
import * as three from 'three';

// always in need of scenes camera and renderer
const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;// this i added

