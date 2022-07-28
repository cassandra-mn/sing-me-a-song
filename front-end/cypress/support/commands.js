Cypress.Commands.add('resetDatabase', () => {
	cy.request('POST', 'http://localhost:5000/database/reset').as('deleteAll');
});