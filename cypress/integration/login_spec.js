describe('Wildbook instance login page', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl', 'http://localhost:8080/wildbook/');
    cy.fixture('localVariables').as('localVars');
    cy.logout();
    cy.visit('/login.jsp');
  });

  //sit('successfully logs in programmatically', function(){ //TODO once you add parameters to loginProgrammatically
  //   cy.loginProgrammatically();
  //   cy.visit('/welcome.jsp');
  //   cy.url().should('match',/welcome\.jsp/);
  // });

it.skip('greets with sign in', function() {
    cy.contains('Database login');
    cy.log("Testing testing");
  });

it.skip('cannot visit welcome page before logging in', function(){
    cy.visit('/welcome.jsp');
    cy.contains('Database login').should('exist');
  });

it.skip('requires username', function(){
    let username = this.localVars.username;
    cy.get('input[name=username]').type(username + '{enter}');
    cy.url().should('match',/login/);
    cy.contains('Database login').should('exist');
  });

it.skip('requires password', function(){
    let password = this.localVars.password;
    cy.get('input[name=password]').type(password + '{enter}');
    cy.url().should('match',/login/);
    cy.contains('Database login').should('exist');
  });

it.skip('requires valid username and password', function(){
    let username = this.localVars.username;
    let password = this.localVars.password;
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.url().should('match',/login/);
    cy.contains('Database login').should('exist');
  });

it.skip('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });

});
