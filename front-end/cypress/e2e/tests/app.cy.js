const URL = 'http://localhost:3000/';

beforeEach(() => {
    cy.resetDatabase();
});

describe('test the application', () => {
    it('should display the recommendation after register', () => {
        const recommendation = {
            name: 'Good Vibes',
            youtubeLink: 'https://youtu.be/J0DkaHJu4Js'
        }
        const otherRecommendation = {
            name: 'Good Vibes 2.0',
            youtubeLink: 'https://youtu.be/iAG1W7QJ9FA'
        }

        cy.createRecommendation(recommendation);
        cy.wait(1000);
        cy.upvotes(15);
        cy.wait(1000);
        cy.downvotes(5);
        
        cy.wait(1000);
        cy.createRecommendation(otherRecommendation);
        cy.wait(1000);
        cy.upvotes(8);
        
        cy.wait(1000);
        cy.visit(URL + 'top');

        cy.wait(1000);
        cy.visit(URL + 'random');
    });
});