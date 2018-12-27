describe('Wildbook instance landing page', function() {
  // beforeEach(()=>{
  // });
  before(function() {
    Cypress.config('baseUrl', 'http://localhost:8080/wildbook/');
    cy.visit('/login.jsp?langCode=es');
  });

it.skip('visits landing page in spanish and finds something in spanish', function() {
    cy.contains('Participar');
  });

it.skip('logs in on spanish page', function(){
    cy.login();
  });

it.skip('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
});
