import * as THREE from "three";
import {camera} from "../canva_controllers.js";
import {DynamicCelestialBody, sizeScale} from "./celestial_bodys.js";

export class Planet extends DynamicCelestialBody {
    constructor(
        id,
        name,
        diameter,
        orbitRadius,
        orbitAngle,
        rotationSpeed,
        translationSpeed,
        textureSource
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
        this.textureSource = textureSource;
        this.setSceneObject();
        this.setTooltip();
    }

    get _sceneObjectGeometry() {
        return new THREE.SphereGeometry(this.simulatedRadius, 32, 32);
    }

    get _sceneObjectMaterial() {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(this.textureSource);
        return new THREE.MeshBasicMaterial({ map: texture });
    }

    static get planetScale() {
        return sizeScale / 10;
    }

    get simulatedRadius() {
        return (this.diameter / 2) / Planet.planetScale;
    }

    setTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.style.position = 'absolute';
        this.tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
        this.tooltip.style.color = 'white';
        this.tooltip.style.padding = '5px';
        this.tooltip.style.borderRadius = '5px';
        this.tooltip.style.pointerEvents = 'none';
        this.tooltip.innerText = this.name;
        this.tooltip.id = this.name;
    }

    animateTooltip() {
        const vector = new THREE.Vector3();

        // Obter a posição do objeto
        this.sceneObject.getWorldPosition(vector);

        // Ajustar a posição do vetor para estar acima do objeto
        vector.y += 10;

        // Converter para a tela
        vector.project(camera);

        // Calcular as coordenadas do canvas
        const widthHalf = window.innerWidth / 2;
        const heightHalf = window.innerHeight / 2;

        const x = (vector.x * widthHalf) + widthHalf;
        const y = -(vector.y * heightHalf) + heightHalf;

        this.tooltip.style.left = `${x}px`;
        this.tooltip.style.top = `${y}px`;
    }

    create() {
        super.create();
        document.body.appendChild(this.tooltip);
    }

    animate() {
        super.animate();
        this.animateTooltip();
    }
}