describe('Tests relating to individuals.jsp', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl', 'https://lynx.wildbook.org/'); //production URL: https://lynx.wildbook.org/ https://general-staging.wildbook.org/
    cy.logout();
    cy.fixture('localVariables.json').then((localVars)=>{
      cy.loginLynxStaging(localVars.username, localVars.password);
    });
  });
  afterEach(function () {
    cy.logout();
  });
  it("Shows test individual when navigating to when logged in as admin", function(){
    cy.fixture('liveVariables.json').then((liveVars) =>{
      cy.visit("/individuals.jsp?number=" + liveVars.testIndividualName);
      cy.contains('h1', liveVars.markedIndividualWithName).should('exist');
    });
  });

 it("Doesn't show encountersTableTab of test individual when logged in as admin", function(){
   cy.fixture('liveVariables.json').then((liveVars) =>{
     cy.visit("/individuals.jsp?number=" + liveVars.testIndividualName);
     cy.contains('a', liveVars.encounterTableText).should('not.exist');
   });
 });

 it("Doesn't show cooccurrencesDiagramText of test individual when logged in as admin", function(){
   cy.fixture('liveVariables.json').then((liveVars) =>{
     cy.visit("/individuals.jsp?number=" + liveVars.testIndividualName);
     cy.contains('a', liveVars.cooccurrencesDiagramText).should('not.exist');
   });
 });

 it("Doesn't show cooccurrencesTable Text of test individual when logged in as admin", function(){
   cy.fixture('liveVariables.json').then((liveVars) =>{
     cy.visit("/individuals.jsp?number=" + liveVars.testIndividualName);
     cy.contains('a', liveVars.cooccurrencesTableText).should('not.exist');
   });
 });

});
