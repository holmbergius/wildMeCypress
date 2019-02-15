describe('Wildbook instance landing page', function() {
  // beforeEach(()=>{
  // });
  before(function() {
    Cypress.config('baseUrl', 'http://104.42.42.134:80');
    cy.visit('/login.jsp?langCode=es');
    cy.fixture('localVariables').as('localVars');
  });

it('visits landing page in spanish and finds something in spanish', function() {
    cy.contains('Participar');
  });

it('logs in on spanish page', function(){
    cy.fixture('localVariables.json').then((localVars)=>{
      cy.login(localVars.username, localVars.password);
      cy.visit('/welcome.jsp');
      cy.url().should('match',/welcome\.jsp/);
    });
  });

it('should not contain null text', function() {
    cy.visit('/login.jsp?langCode=es');
    cy.contains('null').should('not.exist');
  });
});
