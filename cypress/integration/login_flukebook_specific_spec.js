describe('Flukebook instance login page', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl','https://www.flukebook.org/');
    cy.visit('/logout.jsp');
    cy.visit('/login.jsp');
  });
  before(function() {
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
  });

it.skip('successfully logs in programmatically', function(){
    cy.loginProgrammatically();
    cy.visit('/welcome.jsp');
    cy.url().should('match',/welcome\.jsp/);
  });

it.skip('greets with sign in', function() {
    cy.contains('Database login');
    cy.log("Testing testing");
  });

it.skip('cannot visit welcome page before logging in', function(){
    cy.visit('/welcome.jsp');
    cy.contains('Database login').should('exist');
  });


it.skip('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
});
