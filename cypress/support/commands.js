Cypress.Commands.add("findAndNavigateToFirstUnapprovedEncounter", ()=>{
  cy.visit('/encounters/searchResults.jsp?state=unapproved');
  cy.get('#results-table > tbody > tr:nth-child(1)').should('have.attr', 'title')
  .then((title)=>{
    cy.visit('/encounters/encounter.jsp?number=' + title.replace("Encounter ", ""));
  });
});

Cypress.Commands.add("login", () => {
  //TODO could shorten test times with cy.request
  // cy.request({
  //   method: 'POST',
  //   url: 'halp',
  //   body: {
  //     user: {
  //       username: 'atticus29',
  //       password: 'myPW',
  //     }
  //   }
  // })
  // .then((resp)=>{
  //   window.localStorage.setItem('halp', resp.body.user.token);
  // });
  cy.visit('/logout.jsp');
  cy.visit('/login.jsp');
  cy.url().should('not.match',/welcome/);
  // cy.get('input[name=username]').type('atticus29'); //TODO put username in a better place
  // cy.get('input[name=password]').type('FPython!11'); //TODO put password in a better place
  // "baseUrl": "https://www.flukebook.org", for cypress.json
  cy.get('input[name=username]').type('tomcat'); //TODO put username in a better place
  cy.get('input[name=password]').type('tomcat123'); //TODO put password in a better place
  cy.get('input[id=logMeIn]').click();
  // cy.get('form[id=logMeInForm]').submit(); //TODO FIX
  cy.url().should('match',/welcome\.jsp/);
});

Cypress.Commands.add("createAndNavigateToEncounterWildbookGeneric", ()=>{
  cy.login();
  cy.visit('/submit.jsp');
  cy.get('input[id=datepicker]').type('2014-01-05 12:30');
  cy.get('input[id=location]').type('a pineapple under the sea');
  cy.get('input[id=locationID]').type('Study Site 1');
  cy.get('#locationID').select('United States', {force: true});
  cy.get('input[id=lat]').type('45.590491');
  cy.get('input[id=longitude]').type('-122.72125829999997');
  cy.get('input[id=depth]').type('3');
  cy.get('input[id=submitterName]').type('Mark Fisher');
  cy.get('input[id=submitterEmail]').type('mark.fisher123@gmail.com');
  cy.get('input[id=photographerName]').type('Someguy Imetonthestreet');
  cy.get('input[id=photographerEmail]').type('Someguy.imetonthestreet@gmail.com');
  cy.get('input[id=submitterOrganization]').type('Self');
  cy.get('input[id=submitterProject]').type('PersonalLifeList');
  cy.get('textarea[id=comments]').type('This is a lot of text fields');
  cy.get('button[id=submitEncounterButton]').click();
  // cy.get('form[id=encounterForm]').submit();
  cy.get('a').click(); //TODO how to access this view encounter link?
});

Cypress.Commands.add("createAndNavigateToEncounterFlukeBook", ()=>{
  cy.login();
  cy.visit('/submit.jsp');
  cy.get('input[id=datepicker]').type('2014-01-05 12:30');
  cy.get('input[id=location]').type('a pineapple under the sea');
  cy.get('input[id=locationID]').type('Study Site 1');
  cy.get('#locationID').select('United States', {force: true});
  cy.get('input[id=lat]').type('45.590491');
  cy.get('input[id=longitude]').type('-122.72125829999997');
  cy.get('input[id=depth]').type('3');
  cy.get('input[id=submitterName]').type('Mark Fisher');
  cy.get('input[id=submitterEmail]').type('mark.fisher123@gmail.com');
  cy.get('input[id=photographerName]').type('Someguy Imetonthestreet');
  cy.get('input[id=photographerEmail]').type('Someguy.imetonthestreet@gmail.com');
  cy.get('input[id=submitterOrganization]').type('Self');
  cy.get('input[id=submitterProject]').type('PersonalLifeList');
  cy.get('textarea[id=comments]').type('This is a lot of text fields');
  cy.get('#genusSpecies').select('Megapter novaeangliae', {force: true});
  cy.get('form[id=encounterForm]').submit();
  cy.get('a').click(); //TODO how to access this view encounter link?
});

Cypress.Commands.add("logout", ()=>{
  cy.visit('/logout.jsp');
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
