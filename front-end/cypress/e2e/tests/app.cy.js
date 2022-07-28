const URL = 'http://localhost:3000/';

beforeEach(() => {
    cy.resetDatabase();
});

describe('tests the creation of a recommendation', () => {
    it('should display the recommendation after register', async () => {
        const recommendation = {
            name: 'Good Vibes',
            youtubeLink: 'https://youtu.be/J0DkaHJu4Js'
        }

        cy.visit(URL);
        cy.get('#name').type(recommendation.name);
        cy.get('#link').type(recommendation.youtubeLink);

        cy.intercept('POST', '/recommendations').as('post');
        cy.get('#submit').click();
        cy.wait('@post');
    });
});