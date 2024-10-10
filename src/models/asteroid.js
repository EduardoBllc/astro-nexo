import * as THREE from "three";
import {DynamicCelestialBody} from './celestial_bodys.js';
import {scene} from "../canva_controllers.js";

function distortGeometry(geometry) {
    const position = geometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);
        const noise = Math.random() * 0.05; // Aumenta a intensidade do ruído
        vertex.addScaledVector(vertex.normalize(), noise);

        position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geometry.computeVertexNormals();
}

export class Asteroid extends DynamicCelestialBody {
    constructor(
        id,
        name,
        diameter,
        orbitRadius,
        orbitAngle,
        rotationSpeed,
        translationSpeed
    ) {
        super(
            id,
            name,
            diameter,
            orbitRadius,
            orbitAngle,
            rotationSpeed,
            translationSpeed
        );
        this.setSceneObject();
    }

    get _sceneObjectGeometry() {
        const geometry = new THREE.DodecahedronGeometry(this.simulatedRadius, 1);
        distortGeometry(geometry);
        return geometry;
    }

    get _sceneObjectMaterial() {
        return new THREE.MeshBasicMaterial({ color: 0x8a8a8a });
    }

    create() {
        scene.add(this.sceneObject);
    }
}