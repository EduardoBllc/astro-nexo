import axios from 'axios';
import {Asteroid} from '../models/asteroid.js';
import moment from 'moment';


export async function fetchAsteroids() {
    try {
        const today = moment().format('YYYY-MM-DD');

        const response = await axios.get(
            'https://api.nasa.gov/neo/rest/v1/feed',
            {
                params: {
                    start_date: today,
                    end_date: today,
                    api_key: import.meta.env.VITE_NASA_API_KEY
                }
            }
        );

        if (response) {
            const data = response.data.near_earth_objects;

            // Mude essa variável para alterar a quantidade de asteroides que serão mostrados na tela
            const asteroidsQty = 20;
            const asteroids = data[today].slice(0, asteroidsQty);

            for (let asteroid of asteroids) {
                const diameter = (asteroid.estimated_diameter.kilometers.estimated_diameter_max + asteroid.estimated_diameter.kilometers.estimated_diameter_min) / 2
                const velocity = asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour / 10;

                const asteroideObject = new Asteroid(
                    asteroid.id,
                    asteroid.name,
                    diameter,
                    Math.floor(Math.random() * (160 - 50) + 50),
                    Math.floor(Math.random() * (90 - (-90)) + (-90)),
                    0,
                    velocity,
                    'moon.jpg',
                );
                asteroideObject.register();
            }
        }
    } catch (error) {
        // Manipula erros da requisição
        console.error('Erro ao buscar dados:', error.response ? error.response.data : error.message);
    }
}
