import {jest} from '@jest/globals';
import {Recommendation} from '@prisma/client';
import {CreateRecommendationData, recommendationService} from '../../src/services/recommendationsService.js';
import {recommendationRepository} from '../../src/repositories/recommendationRepository.js';

jest.mock('../../src/repositories/recommendationRepository');

describe('recommendation test suit', () => {
    const recommendation: CreateRecommendationData = {
        name: "teste",
        youtubeLink: "https://www.youtube.com/watch?v=tVlcKp3bWH8"
    }

    it('creates a recommendation', async () => {
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce(() : any => undefined);
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce(() : any => {});

        await recommendationService.insert(recommendation);
        expect(recommendationRepository.create).toBeCalled();
    });

    it('returns conflict error', async () => {
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce(() : any => recommendation);

        expect(recommendationService.insert(recommendation)).rejects.toEqual({type: "conflict", message: "Recommendations names must be unique"});
    });

    it('returns not found error in upvote', async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce(() : any => undefined);

        expect(recommendationService.upvote(1)).rejects.toEqual({type: "not_found", message: ""});
    });

    it('should upvote', async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce(() : any => recommendation);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce(() : any => {});

        await recommendationService.upvote(1);
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it('returns not found error in downvote', async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce(() : any => undefined);

        expect(recommendationService.downvote(1)).rejects.toEqual({type: "not_found", message: ""});
    });

    it('should downvote', async () => {
        const recommendation: Recommendation = {
            id: 1,
            name: "teste",
            youtubeLink: "https://www.youtube.com/watch?v=tVlcKp3bWH8",
            score: -5 
        }
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce(() : any => recommendation);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce(() : any => recommendation);

        await recommendationService.downvote(recommendation.id);
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it('remove recommendation in downvote', async () => {
        const recommendation: Recommendation = {
            id: 1,
            name: "teste",
            youtubeLink: "https://www.youtube.com/watch?v=tVlcKp3bWH8",
            score: -6   
        }
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce(() : any => recommendation);
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce(() : any => recommendation);
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce(() : any => {});

        await recommendationService.downvote(recommendation.id);
        expect(recommendationRepository.remove).toBeCalled();
    });

    it('should get recommendations', async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(() : any => {});

        await recommendationService.get();
        expect(recommendationRepository.findAll).toBeCalled();
    });

    it('should get top recommendations', async () => {
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce(() : any => {});

        await recommendationService.getTop(10);
        expect(recommendationRepository.getAmountByScore).toBeCalled();
    });

    it.todo('should get random'
    //, async () => {}
    );

    it('delete all', async () => {
        jest.spyOn(recommendationRepository, "deleteAll").mockImplementationOnce(() : any => {});

        await recommendationService.deleteAll();
        expect(recommendationRepository.deleteAll).toBeCalled();
    });
});