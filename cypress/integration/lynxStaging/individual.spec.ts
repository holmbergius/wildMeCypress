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
  it("Shows test individual when navigating to its encounter page when logged in as admin", function(){
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

 it("Shows collaborator B being able to see an encounter created by collaborator A", function(){
   cy.fixture('liveVariables.json').then((liveVars) =>{
     cy.logout();
     cy.loginLynxStaging(liveVars.collaboratorB_Username, liveVars.collaboratorB_Password);
     cy.visit('/encounters/encounter.jsp?number=32017582-7734-43ea-afac-5fd376232475');
     cy.contains(liveVars.nonCollaboratorMessage).should('not.exist');
   });
 });

 it("Shows collaborator C not being able to see an encounter created by collaborator A", function(){
   cy.fixture('liveVariables.json').then((liveVars) =>{
     cy.logout();
     cy.loginLynxStaging(liveVars.collaboratorC_Username, liveVars.collaboratorC_Password);
     cy.visit('/encounters/encounter.jsp?number=32017582-7734-43ea-afac-5fd376232475');
     cy.contains(liveVars.nonCollaboratorMessage).should('exist');
   });
 });

 it("Shows collaborator C not being able to see search results of encounters created by collaborator A", function(){
   cy.fixture('liveVariables.json').then((liveVars) =>{
     cy.logout();
     cy.loginLynxStaging(liveVars.collaboratorC_Username, liveVars.collaboratorC_Password);
     cy.visit('/encounters/searchResults.jsp?ne_lat=&ne_long=&sw_lat=&sw_long=&locationField=&datepicker1=&datepicker2=&dateaddedpicker1=&dateaddedpicker2=&male=male&female=female&unknown=unknown&genusField=&alive=alive&dead=dead&observationKey1=&observationValue1=&numSearchedObs=1&lifeStageField=None&numResights=1&alternateIDField=&individualID=&tissueSampleID=&biomeasurement13C%28operator%29=gteq&biomeasurement13C%28value%29=&biomeasurement15N%28operator%29=gteq&biomeasurement15N%28value%29=&biomeasurement34S%28operator%29=gteq&biomeasurement34S%28value%29=&nameField=&additionalCommentsField=&username=collaborator_a&submitSearch=Search+Sightings');
     // cy.visit('/encounters/searchResults.jsp?ne_lat=&ne_long=&sw_lat=&sw_long=&locationField=&datepicker1=&datepicker2=&dateaddedpicker1=&dateaddedpicker2=&male=male&female=female&unknown=unknown&genusField=&alive=alive&dead=dead&observationKey1=&observationValue1=&numSearchedObs=1&lifeStageField=None&measurementWaterTemperature%28operator%29=gteq&measurementWaterTemperature%28value%29=&measurementSalinity%28operator%29=gteq&measurementSalinity%28value%29=&measurementcarapacewidth%28operator%29=gteq&measurementcarapacewidth%28value%29=&measurementcarapacelength%28operator%29=gteq&measurementcarapacelength%28value%29=&numResights=1&alternateIDField=&individualID=&metalTag%28left%29=&metalTag%28right%29=&acousticTagSerial=&acousticTagId=&satelliteTagName=None&satelliteTagSerial=&satelliteTagArgosPttNumber=&tissueSampleID=&nameField=&additionalCommentsField=&username=collaborator_a&submitSearch=Search+Sightings');
     cy.contains('Loading results table...').should('not.be.visible');
     cy.contains('tr',liveVars.collaboratorA_imageName).should('not.exist');
   });
 });

});
