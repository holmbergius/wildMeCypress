describe('Wildbook instance login page', function() {
  beforeEach(()=>{
    cy.visit('/logout.jsp');
    cy.visit('/login.jsp');
  });
  before(function() {
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
    let username = 'tomcat';
    let password = 'tomcat123';
  });

  //it.skip('successfully logs in programmatically', function(){
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
    cy.get('input[name=username]').type('atticus29{enter}'); //TODO put username in a better place
    cy.url().should('match',/login/);
    cy.contains('Database login').should('exist'); //TODO this currently takes you to an encounter page and then displays Request collaboration with Shane Gero??
  });

 it.skip('requires password', function(){
    cy.get('input[name=password]').type('FPython!11{enter}'); //TODO put password in a better place
    cy.url().should('match',/login/);
    cy.contains('Database login').should('exist');
  });

 it.skip('requires valid username and password', function(){
    cy.get('input[name=username]').type(username); //TODO put username in a better place
    cy.get('input[name=password]').type(password); //TODO put password in a better place
    cy.url().should('match',/login/);
    cy.contains('Database login').should('exist');
  });

 it.skip('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });

});
