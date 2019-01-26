describe('Tests to check whether matching is broken', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl','https://www.flukebook.org/');
    cy.logout();
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.loginProgrammatically(liveVars.username, liveVars.password);
    });
  });

  it('navigates to known bottle nosed dolphin encounter page and re-runs matching', function(){
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.visit('/encounters/encounter.jsp?number=' + liveVars.bottleNosedDolphinEncounterID);
      cy.get('div[class=image-enhancer-menu]').click();
      cy.get('div[class=menu-item]').contains('start matching').click({force: true});
    });
  });

  it('navigates to known humpback whales encounter page and re-runs matching', function(){
  });

  it('navigates to known sperm whale encounter page and re-runs matching', function(){
  });

  it('navigates to known right whale encounter page and re-runs matching', function(){
  });

});
