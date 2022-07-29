Cypress.Commands.add('resetDatabase', () => {
	cy.request('POST', 'http://localhost:5000/database/reset').as('deleteAll');
});

Cypress.Commands.add('createRecommendation', (recommendation) => {
	cy.visit('http://localhost:3000/');
	cy.get('#name').type(recommendation.name);
	cy.get('#link').type(recommendation.youtubeLink);

	cy.intercept('POST', '/recommendations').as('post');
	cy.get('#submit').click();
	cy.wait('@post');
});

Cypress.Commands.add('upvotes', (max) => {
	for (let i = 1; i <= max; i++) cy.get('#upvote').click();
});

Cypress.Commands.add('downvotes', (max) => {
	for (let i = 1; i <= max; i++) cy.get('#downvote').click();
});