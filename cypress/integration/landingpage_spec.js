
beforeEach(()=>{

});

describe('Wildbook instance landing page', function() {
  before(function() {
    cy.visit('/');
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
  });
  it('visits landing page and finds something that says submit!', function() {
    cy.contains('Submit');
  });
});

describe('Log in page tests', function(){
  before(function() {
    cy.visit('https://www.flukebook.org/login.jsp');
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
  });
  it('logs in', function(){
    cy.get('input[name=username]').type('atticus29');
    cy.get('input[name=password]').type('FPython!11');
    cy.get('input[name=submit]').click();
  });
});

describe('Wildbook instance landing page known bugs', function() {
  before(function() {
    cy.visit('/');
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
  });
  it('looks for text containing null', function() {
    cy.contains('Mark Aaron Fisher').should('not.exist');
    cy.contains('null').should('not.exist');
  });
});
