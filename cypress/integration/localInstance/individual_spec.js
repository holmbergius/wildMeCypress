describe('Wildbook instance encounter page', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl', 'http://localhost:8080/wildbook/');
    cy.logout();
    cy.login();
    cy.createEncounterMarkIndividualNavigateThereGeneric();
  });

  afterEach(function () {
    cy.go('back');
    cy.deleteEncounterGeneric();
  });

it.skip('successfully runs beforeEach and afterEach', function(){
  });

it.skip('can successfully generate encounter, connect it to a marked individual, and navigate to individual page', function(){
      cy.url().should('match',/individuals\.jsp/);
      cy.contains('Marked Individual').should('exist');
  });
});
