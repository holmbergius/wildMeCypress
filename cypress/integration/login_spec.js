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
  });

  it('greets with sign in', function() {
    cy.contains('Database login');
  });

  it('cannot visit welcome page before logging in', function(){
    cy.visit('/welcome.jsp');
    cy.contains('Database login').should('exist');
  });

  it('navigates to welcome.jsp on successful login', function(){
    cy.get('input[name=username]').type('atticus29'); //TODO put username in a better place
    cy.get('input[name=password]').type('FPython!11'); //TODO put password in a better place
    cy.get('form').first().submit(); //TODO brittle if they add more forms but forms don't have ids currently in login.jsp
    cy.contains('Database login').should('not.exist');
    cy.contains('Login success').should('exist');
  });

  it('requires username', function(){
    cy.get('input[name=username]').type('atticus29'); //TODO put username in a better place
    cy.get('form').first().submit(); //TODO brittle if they add more forms but forms don't have ids currently in login.jsp
    cy.contains('Database login').should('exist'); //TODO this currently takes you to an encounter page and then displays Request collaboration with Shane Gero??
    // cy.get('input[value=Cancel]').click();
  });

  it('requires password', function(){
    cy.get('input[name=password]').type('FPython!11'); //TODO put password in a better place
    cy.get('form').first().submit(); //TODO brittle if they add more forms but forms don't have ids currently in login.jsp
    cy.contains('Database login').should('exist');
  });

  it('requires valid username and password', function(){
    cy.get('input[name=username]').type('atticus2'); //TODO put username in a better place
    cy.get('input[name=password]').type('FPyth11'); //TODO put password in a better place
    cy.get('form').first().submit(); //TODO brittle if they add more forms but forms don't have ids currently in login.jsp
    cy.contains('Database login').should('exist');
  });

});

describe('Log in page tests', function(){


});
