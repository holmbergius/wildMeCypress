Cypress.on('fail', (err, runnable) => {
  debugger
});

describe('Tests to check whether matching is broken', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl','https://www.flukebook.org/');
    cy.logout();
    let bottleNoseTaskId = 'bottleNoseTaskId'
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.loginProgrammatically(liveVars.username, liveVars.password);
    });
  });

 it.skip('navigates to known bottle nosed dolphin encounter page and re-runs matching, waits ten minutes, and then checks the output of the iaResults from the taskId of the known bottle nosed dolphin encounter', function(){
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.visit('/encounters/encounter.jsp?number=' + liveVars.bottleNosedDolphinEncounterID);
      cy.get('div[class=image-enhancer-menu]').click();
      cy.get('div[class=menu-item]').contains('start matching').click({force: true});
      cy.get('p[id=activeTaskId]', {force: true}).invoke('text').then((theText)=>{
        let bottleNoseTaskId = theText;
        cy.log(bottleNoseTaskId);
        cy.visit('/iaResults.jsp?taskId=' + bottleNoseTaskId);
        cy.contains('waiting for results').should('exist');
        cy.get('span[class="annot-info-num"]', {force: true}).should('not.exist');
        cy.get('span[class="img-info-type"]', {force: true}).should('not.exist');
        cy.wait(600000);
        cy.visit('/iaResults.jsp?taskId=' + bottleNoseTaskId);
        cy.get('span[class="annot-info-num"]', {force: true}).should('exist');
        cy.get('span[class="img-info-type"]', {force: true}).should('exist');
        //TODO test passing despite assertion failing!! WTH
      });
    });
  });

 it.skip('navigates to known humpback whale encounter page and re-runs matching, waits ten minutes, and then checks the output of the iaResults from the taskId of the known bottle nosed dolphin encounter', function(){
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.visit('/encounters/encounter.jsp?number=' + liveVars.humpbackWhaleEncounterID);
      cy.get('div[class=image-enhancer-menu]').click();
      cy.get('div[class=menu-item]').contains('start another matching job').click({force: true});
      cy.get('p[id=activeTaskId]', {force: true}).invoke('text').then((theText)=>{
        let humpbackTaskId = theText;
        cy.log(humpbackTaskId);
        cy.visit('/iaResults.jsp?taskId=' + humpbackTaskId);
        cy.contains('waiting for results').should('exist');
        cy.get('span[class="annot-info-num"]', {force: true}).should('not.exist');
        cy.get('span[class="img-info-type"]', {force: true}).should('not.exist');
        cy.wait(600000);
        cy.visit('/iaResults.jsp?taskId=' + humpbackTaskId);
        cy.get('span[class="annot-info-num"]', {force: true}).should('exist');
        cy.get('span[class="img-info-type"]', {force: true}).should('exist');
        //TODO test passing despite assertion failing!! WTH
      });
    });
  });

 it.skip('navigates to known sperm whale encounter page and re-runs matching, waits ten minutes, and then checks the output of the iaResults from the taskId of the known bottle nosed dolphin encounter', function(){
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.visit('/encounters/encounter.jsp?number=' + liveVars.spermWhaleEncounterID);
      cy.get('div[class=image-enhancer-menu]').click();
      cy.get('div[class=menu-item]').contains('start another matching job').click({force: true});
      cy.get('p[id=activeTaskId]', {force: true}).invoke('text').then((theText)=>{
        let spermWhaleTaskID = theText;
        cy.log(spermWhaleTaskID);
        cy.visit('/iaResults.jsp?taskId=' + spermWhaleTaskID);
        cy.contains('waiting for results').should('exist');
        cy.get('span[class="annot-info-num"]', {force: true}).should('not.exist');
        cy.get('span[class="img-info-type"]', {force: true}).should('not.exist');
        cy.wait(600000);
        cy.visit('/iaResults.jsp?taskId=' + spermWhaleTaskID);
        cy.get('span[class="annot-info-num"]', {force: true}).should('exist');
        cy.get('span[class="img-info-type"]', {force: true}).should('exist');
        //TODO test passing despite assertion failing!! WTH
      });
    });
  });

 it('navigates to known right whale encounter page and re-runs matching, waits ten minutes, and then checks the output of the iaResults from the taskId of the known bottle nosed dolphin encounter', function(){
    cy.fixture('liveVariables.json').then((liveVars)=>{
      cy.visit('/encounters/encounter.jsp?number=' + liveVars.rightWhaleEncounterID);
      cy.get('div[class=image-enhancer-menu]').click();
      cy.get('div[class=menu-item]').contains('start another matching job').click({force: true});
      cy.get('p[id=activeTaskId]', {force: true}).invoke('text').then((theText)=>{
        let rightWhaleTaskID = theText;
        cy.log(rightWhaleTaskID);
        cy.visit('/iaResults.jsp?taskId=' + rightWhaleTaskID);
        cy.contains('waiting for results').should('exist');
        cy.get('span[class="annot-info-num"]', {force: true}).should('not.exist');
        cy.get('span[class="img-info-type"]', {force: true}).should('not.exist');
        cy.wait(600000);
        cy.visit('/iaResults.jsp?taskId=' + rightWhaleTaskID);
        cy.get('span[class="annot-info-num"]', {force: true}).should('exist');
        cy.get('span[class="img-info-type"]', {force: true}).should('exist');
        //TODO test passing despite assertion failing!! WTH
      });
    });
  });
});
