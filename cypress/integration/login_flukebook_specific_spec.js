describe('Flukebook instance login page', function() {
  beforeEach(()=>{
    cy.config('baseUrl','https://www.flukebook.org');
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

 it('successfully logs in programmatically', function(){
    cy.loginProgrammatically();
    cy.visit('/welcome.jsp');
    cy.url().should('match',/welcome\.jsp/);
  });

 it('greets with sign in', function() {
    cy.contains('Database login');
    cy.log("Testing testing");
  });

 it('cannot visit welcome page before logging in', function(){
    cy.visit('/welcome.jsp');
    cy.contains('Database login').should('exist');
  });


 it('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
});
