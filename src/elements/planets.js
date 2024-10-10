import {Planet} from "../models/planet.js";
import {StaticCelestialBody, sunDiameter} from "../models/celestial_bodys.js";

export const planets = [];

export const sunObject = new StaticCelestialBody(
    1,
    'Sun',
    sunDiameter,
    1000
);

// Mercury
export const mercuryObject = new Planet(
    2,
    "Mercury",
    4880,
    15,
    7.0,
    180000,
    47870,
    'mercury.jpg'
);
planets.push(mercuryObject);

// Venus
export const venusObject = new Planet(
    3,
    "Venus",
    12104,
    20,
    3.39,
    6.5,
    35020,
    'venus.jpg'
);
planets.push(venusObject)

// Earth
export const earthObject = new Planet(
    4,
    'Earth',
    12756,
    25,
    0.0,
    1666,
    29780,
    'earth.jpg'
);
planets.push(earthObject)

// Moon
export const moonObject = new Planet(
    5,
    "Moon",
    3474,
    27,
    0.0,
    1666 / 27,
    29780,
    'moon.jpg'
);
planets.push(moonObject);

// Mars
export const marsObject = new Planet(
    6,
    "Mars",
    6779,
    40,
    25.19,
    1600,
    24077,
    'mars.jpg'
);
planets.push(marsObject);

// Jupyter
export const jupyterObject = new Planet(
    7,
    "Jupyter",
    139820,
    60,
    3.13,
    47000,
    13070,
    'jupiter.jpg'
);
planets.push(jupyterObject);

// Saturn
export const saturnObject = new Planet(
    8,
    "Saturn",
    116460,
    90,
    26.73,
    1666 * 2.3,
    9690,
    'saturn.jpg'
);
planets.push(saturnObject);

// Uranus
export const uranusObject = new Planet(
    9,
    "Uranus",
    50724,
    130,
    0.77,
    1666 * 1.3,
    6810,
    'uranus.jpg'
);
planets.push(uranusObject);

// Neptune
export const neptuneObject = new Planet(
    10,
    "Neptune",
    49244,
    165,
    1.76,
    1666 * 1.5,
    5430,
    'neptune.jpg'
);
planets.push(neptuneObject);