import {faker} from '@faker-js/faker';
import supertest from 'supertest';

import app from '../../src/app.js';

const agent = supertest(app);

export function createRecommendations() {
    return {
        name: faker.music.songName(),
        youtubeLink: `www.youtube.com/${faker.music.songName()}`
    }
}

export async function createScenarioTwelveRecommendations() {
    for (let i = 0; i < 12; i++) {
        await agent.post('/recommendations').send(createRecommendations());
    }
}

export function generateRandomNumber() {
    return Math.floor(Math.random() * 13);
}

export async function upvoteOrDownvoteByCertainAmount(max: number, id: number, condition: string) {
    for (let i = 0; i <= max; i++) {
        await agent.post(`/recommendations/${id}/${condition}`).send({});
    }
}