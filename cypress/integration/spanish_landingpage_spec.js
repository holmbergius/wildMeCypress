describe('Wildbook instance landing page', function() {
  it('visits landing page in spanish and finds something that says Informe de Encuentro!', function() {
    cy.visit('https://www.flukebook.org?langCode=es');
    cy.contains('Informe de Encuentro');
  });
  it('visits landing page and looks for any text that displays null', function() {
    cy.visit('https://www.flukebook.org?langCode=es');
    cy.contains('null').should('not.exist');
  });
});
