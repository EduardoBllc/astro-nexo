import * as THREE from 'three';
import {Scene, WebGLRenderer, PerspectiveCamera} from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

let w = window.innerWidth;
let h = window.innerHeight;

// Scene
export const scene = new Scene();

// Renderer
export const renderer = new WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.setSize(w, h);

// Camera
export const camera = new PerspectiveCamera(75, w / h, 0.1, 2000);
camera.position.set(27, -222, 121);
const defaultCameraPosition = camera.position.clone();

// Controls
export const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0;
controls.maxDistance = 250;

// Mouse da cena
export const mouse = new THREE.Vector2();