describe('Wildbook instance encounter page', function() {
  beforeEach(()=>{
    cy.logout();
    cy.login();
    cy.createEncounterMarkIndividualNavigateThereGeneric();
  });

  afterEach(function () {
    cy.go('back');
    cy.deleteEncounterGeneric();
  })

it.skip('can successfully generate encounter, connect it to a marked individual, and navigate to individual page', function(){
    cy.url().should('match',/individuals\.jsp/);
    cy.contains('Marked Individual').should('exist');
  });
});
