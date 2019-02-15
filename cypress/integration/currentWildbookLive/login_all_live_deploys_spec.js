describe('All live instances should have these tests', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl','http://104.42.42.134:80'); //TODO will want to change this to be more generic some day?
    cy.fixture('localVariables').as('localVars');
  });

it('cannot use tomcat to log in programmatically', function(){
    cy.visit('/logout.jsp');
    cy.visit('/login.jsp');
    cy.url().should('not.match',/welcome/);
    let username = this.localVars.username;
    let password = this.localVars.password;
    cy.request({
      method: 'POST',
      url: 'https://www.flukebook.org/LoginUser',
      form: true,
      body: {
        username: username,
        password: password
      }
    });
    cy.visit('/welcome.jsp');
    cy.url().should('not.match',/welcome\.jsp/);
  });

});
