Cypress.Commands.add("form_request", (url, formData) => {
  cy.log("Got into form_request");
  cy.server();
    return cy
      .route("POST", url)
      .as("formRequest")
      .window()
      .then(win => {
        var xhr = new win.XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.setRequestHeader("content-type", "multipart/form-data");
        xhr.send(formData);
      })
      .wait("@formRequest");
});

Cypress.Commands.add("findAndNavigateToFirstUnapprovedPortlandEncounter", ()=>{
  cy.visit('/encounters/searchResults.jsp?state=unapproved');
  cy.get('#results-table > tbody > tr:nth-child(1)',{timeout:20000})
  cy.get('input[id=filter-text]').type('portland{enter}');
  cy.get('#results-table > tbody > tr:nth-child(1)',{timeout:20000}).should('have.attr', 'title')
  .then((title)=>{
    cy.visit('/encounters/encounter.jsp?number=' + title.replace("Encounter ", ""));
  });
});

Cypress.Commands.add("deleteEncounterGeneric", ()=>{
  cy.get('button[id=editMeta]').click();
  cy.get('input[id=deleteButton]').click();
  Cypress.on('window:confirm', (err, runnable) => {
  });
});

Cypress.Commands.add("deleteEncounterFlukebook", ()=>{
  cy.get('button[id=editMeta]').click();
  cy.get('input[id=deleteButton]').click();
  Cypress.on('window:confirm', (err, runnable) => {
  });
});

Cypress.Commands.add("findAndNavigateToFirstUnapprovedEncounter", ()=>{
  cy.visit('/encounters/searchResults.jsp?state=unapproved');
  cy.get('#results-table > tbody > tr:nth-child(1)',{timeout:20000}).should('have.attr', 'title')
  .then((title)=>{
    cy.visit('/encounters/encounter.jsp?number=' + title.replace("Encounter ", ""));
  });
});

Cypress.Commands.add("logout", ()=>{
  cy.visit('/logout.jsp');
});

Cypress.Commands.add("loginLocally", ()=>{
  cy.visit('/login.jsp');
  cy.url().should('not.match',/welcome/);
  cy.get('input[name=username]').type('tomcat'); //TODO put username in a better place
  cy.get('input[name=password]').type('tomcat123'); //TODO put password in a better place
  cy.get('input[id=logMeIn]').click();
  cy.url().should('match',/welcome\.jsp/);
});

Cypress.Commands.add("login", ()=>{
  if(Cypress.config().baseUrl==="https://www.flukebook.org"){
    cy.loginProgrammatically();
  } else{
    cy.loginLocally();
  }
});

Cypress.Commands.add("loginProgrammatically", () => {
  cy.request({
    method: 'POST',
    url: cy.config('baseUrl') + 'LoginUser',
    form: true,
    body: {
      username:'atticus29', //TODO figure out how to generalize
      password:'FPython!11' //TODO figure out how to generalize
    }
  })
  .then((resp)=>{
    expect(resp.status).to.eq(200);
    cy.log(resp.requestHeaders.cookie);
    // window.localStorage.setItem('flukebook_login_cookie', resp.requestHeaders.cookie);
  });
  // cy.visit('/welcome.jsp',{
    // onBeforeLoad: function(win){
    //   win.localStorage.setItem('flukebook_login_cookie', flukebook_login_cookie);
    // }
  // })
  // cy.visit('/welcome.jsp');
});

Cypress.Commands.add("createAndNavigateToEncounterWildbookGeneric", ()=>{
  cy.logout();
  cy.login();
  cy.visit('/submit.jsp');
  cy.get('input[id=datepicker]').type(new Date().toString());
  cy.get('input[id=location]').type('a pineapple under the sea');
  cy.get('#locationID').select('1', {force: true});
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
  cy.url().should('match',/confirmSubmit/);
  cy.get('a').contains('View encounter').click();
  cy.url().should('match', /encounter.jsp/);
});

Cypress.Commands.add("createEncounterMarkIndividualNavigateThereGeneric", ()=>{
  //these are brittle af
  cy.logout();
  cy.login();
  cy.visit('/submit.jsp');
  cy.get('input[id=datepicker]').type(new Date().toString());
  cy.get('input[id=location]').type('a pineapple under the sea');
  cy.get('#locationID').select('1', {force: true});
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
  cy.url().should('match',/confirmSubmit/);
  cy.get('a').contains('View encounter').click();
  cy.url().should('match', /encounter.jsp/);
  cy.get('button[id=editIdentity]').click();
  let randomNumString = Math.random().toString()
  cy.get('input[id=individualAddEncounterInput]').type('testIndividual123');
  cy.get('input[id=Add]').click();
  cy.get('button[id=closeEditIdentity]').click();
  cy.get('span[id=displayIndividualID]').click();
});


Cypress.Commands.add("createAndNavigateToEncounterFlukeBook", ()=>{ //TODO create Programmatic version
  cy.loginProgrammatically();
  cy.visit('/submit.jsp');
  cy.get('input[id=datepicker]').type(new Date().toString());
  cy.get('input[id=location]').type('a pineapple under the sea');
  cy.get('#locationID').select('Study Site 1', {force:true});
  cy.get('#country').select('United States', {force: true});
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
  cy.get('#genusSpecies').select('Megaptera novaeangliae', {force: true});
  cy.get('button').contains('Send encounter report').click();
  cy.url().should('match',/confirmSubmit/);
  cy.get('a').contains('View encounter').click();
  cy.url().should('match', /encounter.jsp/);
  // cy.get('form[id=encounterForm]').submit();
  // cy.wait(30000);
  // let encounterId = cy.get('a').contains('View encounter').invoke('text').toString();
  // cy.log(encounterId);
  // encounterId = encounterId.replace("View encounter ","");
  // cy.visit('https://www.flukebook.org/encounters/encounter.jsp?number=' + encounterNum);
  // cy.findAndNavigateToFirstUnapprovedPortlandEncounter();
});

Cypress.Commands.add('uploadFile', (selector, fileUrl, type = '') => {
  return cy.get(selector).then(subject => {
    cy //return
      .fixture(fileUrl, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        // return cy.window().then(win => {
          const el = subject[0];
          const nameSegments = fileUrl.split('/');
          const name = nameSegments[nameSegments.length - 1];
          const testFile = new File([blob], name, { type: type });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
          // return subject;
        // });
      });
  });
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
