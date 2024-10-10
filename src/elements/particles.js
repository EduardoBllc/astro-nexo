// Função para criar o sistema de partículas
import {scene} from "../canva_controllers.js";
import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load('circle.svg');
const particleCount = 30000;

export function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    // Criar várias partículas aleatórias
    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 800;  // Posição x aleatória
        const y = (Math.random() - 0.5) * 800;  // Posição y aleatória
        const z = (Math.random() - 0.5) * 800;  // Posição z aleatória
        positions.push(x, y, z);  // Adicionando a posição da partícula
    }

    // Atribuir as posições ao BufferGeometry
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    // Material para as partículas
    const material = new THREE.PointsMaterial({
        map: starTexture,  // Definindo a textura da estrela
        color: 0xffffff,
        size: 0.5,
        transparent: true,
        depthTest: false
    });

    // Criar sistema de partículas
    const particles = new THREE.Points(geometry, material);
    particles.isStar = true;
    scene.add(particles);
}