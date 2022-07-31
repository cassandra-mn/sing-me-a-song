const URL = 'http://localhost:3000/';

beforeEach(() => {
    cy.resetDatabase();
});

const recommendation = {
    name: 'Good Vibes',
    youtubeLink: 'https://youtu.be/J0DkaHJu4Js'
}
const otherRecommendation = {
    name: 'Good Vibes 2.0',
    youtubeLink: 'https://youtu.be/iAG1W7QJ9FA'
}

describe('recommendation creation tests', () => {
    it('creates a recommendation', () => {
        cy.createRecommendation(recommendation);

        cy.contains(`${recommendation.name}`).should('be.visible');
    });
    
    it('error creating recommendation', () => {
        const recommendation = {name: 'ok', youtubeLink: 'ok'};
        cy.createRecommendation(recommendation);
        
        cy.on("window:alert", (text) => {
            expect(text).to.contains("Error creating recommendation!");
        });
    });
});

describe('tests upvote and downvote', () => {
    it('should add upvotes', () => {
        cy.createRecommendation(recommendation);
        cy.upvotes(15);
        
        cy.get('#score').should('contain.text', '15');
    });

    it('should add downvotes', () => {
        cy.createRecommendation(recommendation);
        cy.downvotes(5);

        cy.get('#score').should('contain.text', '-5');
    });
    
    it('should remove recommendation', () => {
        cy.createRecommendation(recommendation);
        cy.downvotes(6);

        cy.get('#no-recommendations').contains('No recommendations yet! Create your own :)');
    });
});

describe('tests application routes', () => {
    it('get top recommendation', () => {
        cy.createRecommendation(recommendation);
        cy.upvotes(2);

        cy.createRecommendation(otherRecommendation);

        cy.get('#top').click();
        cy.get('#score').should('contain.text', '2');
    });

    it('get random recommendation', () => {
        cy.createRecommendation(recommendation);

        cy.get('#random').click();
        cy.contains(`${recommendation.name}`).should('be.visible');
    });
});