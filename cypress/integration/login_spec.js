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
    cy.login();
    // cy.get('input[name=username]').type('atticus29'); //TODO put username in a better place
    // cy.get('input[name=password]').type('FPython!11'); //TODO put password in a better place
    // // cy.get('form').first().submit();
    // cy.get('input[type=submit]').click({ force: true }); //TODO brittle if they add more forms but forms don't have ids currently in login.jsp
    // cy.contains('Database login').should('not.exist');
    // cy.hash().should('eq','welcome.jsp');
  });

  it('requires username', function(){
    cy.get('input[name=username]').type('atticus29{enter}'); //TODO put username in a better place
    // cy.get('input[name=username]').type('atticus29{enter}'); //TODO put username in a better place TODO this enter should work but doesn't
    // cy.get('form[action=LoginUser]').submit(); //TODO brittle if they add more forms but forms don't have ids currently in login.jsp
    cy.url().should('match',/login/);
    cy.contains('Database login').should('exist'); //TODO this currently takes you to an encounter page and then displays Request collaboration with Shane Gero??
    // cy.get('input[value=Cancel]').click();
  });

  it('requires password', function(){
    cy.get('input[name=password]').type('FPython!11{enter}'); //TODO put password in a better place
    // cy.get('form[action=LoginUser]').submit(); //TODO brittle if they add more forms but forms don't have ids currently in login.jsp
    cy.url().should('match',/login/);
    cy.contains('Database login').should('exist');
  });

  it('requires valid username and password', function(){
    cy.get('input[name=username]').type('atticus2'); //TODO put username in a better place
    cy.get('input[name=password]').type('FPyth11{enter}'); //TODO put password in a better place
    // cy.get('for[action=LoginUser]m').submit(); //TODO brittle if they add more forms but forms don't have ids currently in login.jsp
    cy.url().should('match',/login/);
    cy.contains('Database login').should('exist');
  });

  it('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });

});
