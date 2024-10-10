import * as THREE from 'three';
import {fetchAsteroids} from './src/api/neo_ws.js';
import {CelestialBody, sunSimulatedDiameter} from './src/models/celestial_bodys.js';
import {createParticles} from './src/elements/particles.js';
import $ from 'jquery';
import {planets} from "./src/elements/planets.js";
import {camera, controls, renderer} from "./src/canva_controllers.js";
import {scene} from "./src/canva_controllers.js";

let w = window.innerWidth;
let h = window.innerHeight;

// Criação das partículas
createParticles();

planets.forEach(planet => planet.register());

await fetchAsteroids();
CelestialBody.renderObjects();

setTimeout(
    () => {
        $('#loader').hide();
    },
    2000
);

// Resize (zoom in/out) event
window.addEventListener("resize", () => {
    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
});

// Declarar a variável 'sun' antes de inicializá-la
let sun;

function createSun() {
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(sunSimulatedDiameter, 32, 32);
    const material = new THREE.MeshBasicMaterial({map: textureLoader.load('sun.jpg')});

    // Inicializar a variável 'sun' aqui
    sun = new THREE.Mesh(geometry, material);
    sun.name = "Sun"
    scene.add(sun);

    return sun;
}

// Criar o sol
createSun();

// Animation
function animate() {
    requestAnimationFrame(animate);

    CelestialBody.animateObjects();

    // Girar o sol
    if (sun) {
        sun.rotation.y += 0.001;
    }

    controls.update();
    renderer.render(scene, camera);
}

export function resetCameraPosition() {
    // target = null;
    camera.position.copy(defaultCameraPosition);
    camera.lookAt(0, 0, 0);
}

// Render final
renderer.render(scene, camera);
animate();
