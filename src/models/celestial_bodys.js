import * as THREE from 'three';
import {scene} from "../canva_controllers.js";

export const translationSpeedScale = 16200000;
export const rotationSpeedScale = 3332000;
export const sunDiameter = 1392684;
export const sunSimulatedDiameter = 15;
export const sizeScale = (sunDiameter / sunSimulatedDiameter)

export class CelestialBody {
    /**
     * Represents a renderable Celestial Body
     * @constructor
     * @param {number} id - The id of the object.
     * @param {string} name - The name of the object.
     * @param {number} diameter - The object diameter in kilometers.
     */

    static _registeredObjects = [];

    static renderObjects() {
        CelestialBody._registeredObjects.forEach(function (object) {
            object.create();
        });
    }

    static animateObjects() {
        CelestialBody._registeredObjects.forEach(function (object) {
            object.animate();
        });
    }

    constructor(
        id,
        name,
        diameter
    ) {
        this.id = id;
        this.name = name;
        this.diameter = diameter;
    }

    // Método abstrato, deve ser implementado nas classes derivadas
    get _sceneObjectGeometry() {
        throw new Error("_sceneObjectGeometry method must be implemented in a subclass");
    }

    get _sceneObjectMaterial() {
        throw new Error("_sceneObjectMaterial method must be implemented in a subclass");
    }

    get sceneObject() {
        return this._sceneObject;
    }

    setSceneObject() {
        this._sceneObject = new THREE.Mesh(this._sceneObjectGeometry, this._sceneObjectMaterial);
        this._sceneObject.name = name;
    }

    create() {
        scene.add(this.sceneObject);
    }

    register() {
        CelestialBody._registeredObjects.push(this);
    }
}

export class StaticCelestialBody extends CelestialBody {
    constructor(
        id,
        name,
        diameter,
        rotationSpeed,
    ) {
        super(id, name, diameter);
        this.rotationSpeed = rotationSpeed;

        this.angle = Math.floor(Math.random() * 360);
    }

    rotate() {
        this.sceneObject.rotation.y += this.rotationSpeed / rotationSpeedScale;
    }

    animate() {
        this.rotate();
    }

    create() {
        super.create();
    }
}

export class DynamicCelestialBody extends CelestialBody {
    constructor(
        id,
        name,
        diameter,
        orbitRadius,
        orbitAngle,
        rotationSpeed,
        translationSpeed,
    ) {
        super(id, name, diameter);
        this.orbitRadius = orbitRadius;
        this.orbitAngle = orbitAngle;
        this.rotationSpeed = rotationSpeed;
        this.translationSpeed = translationSpeed;
        this.setOrbit();

        this.angle = Math.floor(Math.random() * 360);
    }

    setOrbit() {
        this.orbitCurve = new THREE.EllipseCurve(
            0, 0,  // Ponto central (x, y)
            this.orbitRadius + 15, this.orbitRadius + 15,
            0, 2 * Math.PI,
            true,
            0
        );

        const points = this.orbitCurve.getPoints(150);
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x707070 });
        orbitMaterial.isOrbit = true;

        this.orbit = new THREE.Line(orbitGeometry, orbitMaterial);
        this.orbit.rotation.y = THREE.MathUtils.degToRad(this.orbitAngle);
    }

    rotate() {
        this.sceneObject.rotation.y += this.rotationSpeed / rotationSpeedScale;
    }

    moveBody() {
        this.angle += this.translationSpeed / translationSpeedScale;
        const normalizedAngle = (this.angle / (2 * Math.PI)) % 1;
        const point = this.orbitCurve.getPoint(normalizedAngle);

        const inclinedY = point.y * Math.cos(THREE.MathUtils.degToRad(this.orbitAngle));
        const inclinedZ = point.y * Math.sin(THREE.MathUtils.degToRad(this.orbitAngle));

        this.sceneObject.position.set(point.x, inclinedY, inclinedZ);
    }

    animate() {
        this.rotate();
        this.moveBody();
    }

    create() {
        super.create();
        scene.add(this.orbit);
    }
}