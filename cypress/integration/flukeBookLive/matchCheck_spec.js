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
      //TODO get bottleNoseTaskId
    });
  });

  it('waits ten minutes and then checks the output of the iaResults from the taskId of the known bottle nosed dolphin encounter', function(){
    cy.visit('/isResults.jsp?taskId=' + bottleNoseTaskId);
    cy.contains('waiting for results').should('exist');
    cy.wait(600000);
    cy.visit('/isResults.jsp?taskId=' + bottleNoseTaskId);
    cy.contains('waiting for results').should('not.exist');
  });

  it('navigates to known humpback whale encounter page and re-runs matching', function(){
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.visit('/encounters/encounter.jsp?number=' + liveVars.humpbackWhaleEncounterID);
      cy.get('div[class=image-enhancer-menu]').click();
      cy.get('div[class=menu-item]').contains('start matching').click({force: true});
      //TODO get humpbackTaskId
    });
  });

  it('waits ten minutes and then checks the output of the iaResults from the taskId of the known humpback whale encounter', function(){
    cy.visit('/isResults.jsp?taskId=' + humpbackTaskId);
    cy.contains('waiting for results').should('exist');
    cy.wait(600000);
    cy.visit('/isResults.jsp?taskId=' + humpbackTaskId);
    cy.contains('waiting for results').should('not.exist');
  });

  it('navigates to known sperm whale encounter page and re-runs matching', function(){
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.visit('/encounters/encounter.jsp?number=' + liveVars.spermWhaleEncounterID);
      cy.get('div[class=image-enhancer-menu]').click();
      cy.get('div[class=menu-item]').contains('start matching').click({force: true});
      //TODO get spermWhaleTaskID
    });
  });

  it('waits ten minutes and then checks the output of the iaResults from the taskId of the known sperm whale encounter', function(){
    cy.visit('/isResults.jsp?taskId=' + spermWhaleTaskID);
    cy.contains('waiting for results').should('exist');
    cy.wait(600000);
    cy.visit('/isResults.jsp?taskId=' + spermWhaleTaskID);
    cy.contains('waiting for results').should('not.exist');
  });

  it('navigates to known right whale encounter page and re-runs matching', function(){
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.visit('/encounters/encounter.jsp?number=' + liveVars.rightWhaleEncounterID);
      cy.get('div[class=image-enhancer-menu]').click();
      cy.get('div[class=menu-item]').contains('start matching').click({force: true});
      //TODO get rightWhaleTaskID
    });
  });

  it('waits ten minutes and then checks the output of the iaResults from the taskId of the right whale encounter', function(){
    cy.visit('/isResults.jsp?taskId=' + rightWhaleTaskID);
    cy.contains('waiting for results').should('exist');
    cy.wait(600000);
    cy.visit('/isResults.jsp?taskId=' + rightWhaleTaskID);
    cy.contains('waiting for results').should('not.exist');
  });

});
