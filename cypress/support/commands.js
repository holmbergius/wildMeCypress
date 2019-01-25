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
      // .wait("@formRequest");
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

Cypress.Commands.add("loginLocallyManually", ()=>{
  cy.visit('/login.jsp');
  cy.url().should('not.match',/welcome/);
  cy.get('input[name=username]').type('tomcat'); //TODO put username in a better place
  cy.get('input[name=password]').type('tomcat123'); //TODO put password in a better place
  cy.get('input[id=logMeIn]').click();
  cy.url().should('match',/welcome\.jsp/);
});

Cypress.Commands.add("login", (username, password)=>{
  if(Cypress.config().baseUrl==="https://www.flukebook.org/"){
    cy.loginProgrammatically(username, password);
  } else{
    cy.loginProgrammaticallyLocally(username, password);
  }
});

Cypress.Commands.add("loginProgrammaticallyLocally", (username, password) => {
  // console.log(cy.fixture('localVariables').username); //TODO fix?
  // console.log(cy.fixture('localVariables').password);
  cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + '/LoginUser', // add the slash??
    form: true,
    body: {
      username:username,
      password:password
    }
  })
  .then((resp)=>{
    expect(resp.status).to.eq(200);
  });
});

Cypress.Commands.add("loginProgrammatically", (username, password) => {
  // cy.log(username);
  // cy.log(password);
  cy.log(Cypress.config('baseUrl'));
  cy.request({
    method: 'POST',
    url: Cypress.config('baseUrl') + 'LoginUser',
    form: true,
    body: {
      username:username,
      password:password
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
  cy.visit('/welcome.jsp');
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

Cypress.Commands.add("submitNewEncounterProgrammaticallyFlukebook", ()=>{
  cy.loginProgrammatically('atticus29', 'FPython!11'); //TODO fix
  cy.visit('/submit.jsp');
  const uuidMaker = require('uuid/v1');
  let uuid1 = uuidMaker();
  cy.log(uuid1);
  cy.log(uuid1);
  let formData = new FormData();
    let bodyContent = {
      datepicker:'2018-12-19',
      location: 'the encounter form run portland',
      locationID: 'Study Site 1',
      country: 'United States',
      lat: '45.590491',
      longitude: '-122.72125829999997',
      depth: '3',
      submitterName: 'Mark Fisher',
      submitterEmail: 'mark.aaron.fisher@gmail.com',
      photographerName: 'Someguy Imetonthestreet',
      photographerEmail: 'Someguy.imetonthestreet@gmail.com',
      submitterOrganization: 'Self',
      submitterProject: 'PersonalLifeList',
      comments: 'This is a lot of text fields',
      genusSpecies: 'Megaptera novaeangliae',
      catalogNumber: uuid1
    };
    // cy.request({
    //   method: 'POST',
    //   header: {
    //     'content-type': 'multipart/form-data',
    //   },
    //   url: Cypress.config('baseUrl') + 'EncounterForm',
    //   followRedirect: true,
    //   enctype: "multipart/form-data",
    //   form: true,
    //   body: bodyContent
    // })
    formData.append("datepicker", "2019-1-24");
    formData.append("location", "the encounter form run portland");
    formData.append("locationID", "Study Site 1");
    formData.append("country", "United States");
    formData.append("lat", "45.590491");
    formData.append("longitude", "-122.72125829999997");
    formData.append("depth", "3");
    formData.append("submitterName", "Mark Fisher");
    formData.append("submitterEmail", "mark.aaron.fisher@gmail.com");
    formData.append("photographerName", "Someguy Imetonthestreet");
    formData.append("photographerEmail", "Someguy.imetonthestreet@gmail.com");
    formData.append("submitterOrganization", "Self");
    formData.append("submitterProject", "PersonalLifeList");
    formData.append("comments", "This is a lot of text fields");
    formData.append("genusSpecies", "Megaptera novaeangliae");
    formData.append("catalogNumber", uuid1);
    // formData.append("body",bodyContent);
    cy.form_request('https://www.whaleshark.org/EncounterForm', formData) //TODO maybe don't have this hardcoded?
    .then((response) => {
      cy.log("got into the response maybe?");
      // expect(response.status).to.eq(200);
      console.log(response);
      cy.log(response);
      cy.log(response.encounter);
    });
  cy.visit('/encounters/encounter.jsp?number=' + uuid1);
  // cy.url().should('match', /EncounterForm/);
  cy.url().should('match',/encounters/);
});


Cypress.Commands.add("createAndNavigateToEncounterFlukeBook", ()=>{ //TODO create Programmatic version
  cy.loginProgrammatically('atticus29', 'FPython!11'); //TODO fix
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
