describe('Wildbook instance landing page', function() {
  before(function() {
    Cypress.config('baseUrl', 'http://localhost:8080/wildbook/');
    cy.logout();
    cy.visit('/');
  });

it.skip('should not contain How It Works text', function() {
    cy.contains('How it Works').should('exist');
  });

it.skip('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
});
