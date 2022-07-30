import {jest} from '@jest/globals'
import {CreateRecommendationData, recommendationService} from '../../src/services/recommendationsService.js';
import {recommendationRepository} from '../../src/repositories/recommendationRepository.js';
import * as errorUtils from "../../src/utils/errorUtils.js";

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

    it('get', async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce(() : any => {});

        await recommendationService.get();
        expect(recommendationRepository.findAll).toBeCalled();
    });

    it('get top', async () => {
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce(() : any => {});

        await recommendationService.getTop(10);
        expect(recommendationRepository.getAmountByScore).toBeCalled();
    });

    it('delete all', async () => {
        jest.spyOn(recommendationRepository, "deleteAll").mockImplementationOnce(() : any => {});

        await recommendationService.deleteAll();
        expect(recommendationRepository.deleteAll).toBeCalled();
    });
});