import {faker} from '@faker-js/faker';

export function createRecommendations() {
    return {
        name: faker.music.songName(),
        youtubeLink: `www.youtube.com/${faker.music.songName()}`
    }
}