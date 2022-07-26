import supertest from 'supertest';

import app from '../src/app.js';
import {prisma} from '../src/database.js';
import {createRecommendations} from './factories/generalFactory.js';

const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

describe('tests post recommendations', () => {
    it('returns 422 for invalid parameters', async () => {
        const body = {}; 
        const response = await agent.post('/recommendations').send(body);
        expect(response.status).toEqual(422);
    });
    
    it('returns 201 for valid parameters', async () => {
        const body = createRecommendations();
        const response = await agent.post('/recommendations').send(body);
        expect(response.status).toEqual(201);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});