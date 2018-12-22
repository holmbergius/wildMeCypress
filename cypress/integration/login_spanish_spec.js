describe('Wildbook instance landing page', function() {
  // beforeEach(()=>{
  // });
  before(function() {
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
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
