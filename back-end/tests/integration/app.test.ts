import supertest from 'supertest';

import app from '../../src/app.js';
import {prisma} from '../../src/database.js';
import * as factory from './factories/generalFactory.js';

const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
});

describe('tests post recommendations', () => {
    it('returns status 422 for invalid parameters', async () => {
        const response = await agent.post('/recommendations').send({});
        expect(response.status).toEqual(422);
    });
    
    it('returns status 409 for duplicate parameters', async () => {
        const body = factory.createRecommendations();
        await agent.post('/recommendations').send(body);
        const response = await agent.post('/recommendations').send(body);
        expect(response.status).toEqual(409);
    });

    it('returns status 201 for valid parameters', async () => {
        const body = factory.createRecommendations();
        const response = await agent.post('/recommendations').send(body);
        expect(response.status).toEqual(201);
    });

    it('returns status 200 when upvote', async () => {
        await factory.createScenarioTwelveRecommendations();
        const id = factory.generateRandomNumber();
        const response = await agent.post(`/recommendations/${id}/upvote`).send({});
        expect(response.status).toEqual(200);
    });

    it('returns status 200 when downvote', async () => {
        await factory.createScenarioTwelveRecommendations();
        const id = factory.generateRandomNumber();
        const response = await agent.post(`/recommendations/${id}/downvote`).send({});
        expect(response.status).toEqual(200);
    });

    it('returns status 404 when score is less than -5', async () => {
        await factory.createScenarioTwelveRecommendations();
        const id = factory.generateRandomNumber();
        await factory.upvoteOrDownvoteByCertainAmount(5, id, 'downvote');
        const response = await agent.get(`/recommendations/${id}`);
        expect(response.status).toEqual(404);
    });
});

describe('tests get recommendations', () => {
    it('returns the last 10 recommendations', async () => {
        await factory.createScenarioTwelveRecommendations();
        const response = await agent.get('/recommendations');
        expect(response.body.length).toEqual(10);
    });

    it('returns recommendation by id', async () => {
        await factory.createScenarioTwelveRecommendations();
        const id = factory.generateRandomNumber();
        const response = await agent.get(`/recommendations/${id}`);
        expect(response.body.id).toEqual(id);
    });

    it('returns recommendations order by score', async () => {
        const id = factory.generateRandomNumber();
        const otherId = factory.generateRandomNumber();
        await factory.createScenarioTwelveRecommendations();
        await factory.upvoteOrDownvoteByCertainAmount(8, id, 'upvote');
        await factory.upvoteOrDownvoteByCertainAmount(5, otherId, 'upvote');
        const response = await agent.get('/recommendations/top/2');
        expect(response.body[0].score).toBeGreaterThan(response.body[1].score);
    });

    it('returns random recommendations', async () => {
        await factory.createScenarioTwelveRecommendations();
        const response = await agent.get('/recommendations/random');
        expect(response.body.id).toBeGreaterThanOrEqual(0);
        expect(response.body.id).toBeLessThanOrEqual(12);
    });

    it('returns status 404 when no songs are registered', async () => {
        const response = await agent.get('/recommendations/random');
        expect(response.status).toEqual(404);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});