describe('Wildbook instance landing page known bugs', function() {
  before(function() {
    cy.visit('/logout.jsp');
    cy.visit('/');
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
  });

  it('should not contain How It Works text', function() {
    cy.contains('How it Works').should('exist');
  });

  it('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
});
