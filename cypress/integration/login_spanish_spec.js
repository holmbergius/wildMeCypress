describe('Wildbook instance landing page', function() {
  beforeEach(()=>{
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
  });
  before(function() {
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
    cy.visit('https://www.flukebook.org?langCode=es');
  });

  it('visits landing page in spanish and finds something that says Informe de Encuentro!', function() {
    cy.contains('Informe de Encuentro');
  });
  it('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
});
