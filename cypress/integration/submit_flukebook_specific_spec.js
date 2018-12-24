describe('Flukebook specific encounter submission page', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl','https://www.flukebook.org');
    cy.loginProgrammatically();
    cy.visit('/submit.jsp');
  });

  it('displays report an encounter', function(){
    cy.contains('Report an Encounter');
  });

 it('correctly fills out full encounter form without advanced information', function(){
    cy.get('input[id=datepicker]').type('2018-12-19');
    cy.get('input[id=location]').type('portland, France');
    cy.get('#locationID').select('Study Site 1', {force: true});
    cy.get('#country').select('United States', {force: true});
    cy.get('input[id=lat]').type('45.590491');
    cy.get('input[id=longitude]').type('-122.72125829999997');
    cy.get('input[id=depth]').type('3');
    cy.get('input[id=submitterName]').type('Mark Testing This Fisher');
    cy.get('input[id=submitterEmail]').type('mark.fisher123@gmail.com');
    cy.get('input[id=photographerName]').type('Someguy Imetonthestreet');
    cy.get('input[id=photographerEmail]').type('Someguy.imetonthestreet@gmail.com');
    cy.get('input[id=submitterOrganization]').type('Self');
    cy.get('input[id=submitterProject]').type('PersonalLifeList');
    cy.get('textarea[id=comments]').type('This is a lot of text fields');
    cy.get('#genusSpecies').select('Megaptera novaeangliae', {force: true});
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
      genusSpecies: 'Megaptera novaeangliae'
    };
    formData.append("body",bodyContent);
    cy.form_request('https://www.flukebook.org/EncounterForm', formData)
    .then((response) => {
      cy.log("got into response");
      expect(response.status).to.eq(200);
      console.log(response);
      cy.log(response);
    });
    // cy.request({
    //   method: 'POST',
    //   url: 'https://www.flukebook.org/EncounterForm',
    //   headers: {
    //     'content-type':'multipart/form-data'
    //   },
    //   form: true,
    //   body: {
    //     datepicker:'2018-12-19',
    //     location: 'a pineapple under the sea',
    //     locationID: 'Study Site 1',
    //     country: 'United States',
    //     lat: '45.590491',
    //     longitude: '-122.72125829999997',
    //     depth: '3',
    //     submitterName: 'Mark Fisher',
    //     submitterEmail: 'mark.aaron.fisher@gmail.com',
    //     photographerName: 'Someguy Imetonthestreet',
    //     photographerEmail: 'Someguy.imetonthestreet@gmail.com',
    //     submitterOrganization: 'Self',
    //     submitterProject: 'PersonalLifeList',
    //     comments: 'This is a lot of text fields',
    //     genusSpecies: 'Megaptera novaeangliae'
    //   }
    // })
    // .then((resp)=>{
    //   expect(resp.status).to.eq(200);
    //   cy.log(resp.toString());
    //   // window.localStorage.setItem('flukebook_login_cookie', resp.requestHeaders.cookie);
    // });
    // cy.get('form[id=encounterForm]').submit(); //TODO this doesn't work for the same reasons that the login form submission didn't work
    cy.url().should('match', '/confirmSubmit/');
  });

  it('correctly fills out minimal encounter form without advanced information', function(){ //TODO fix
    cy.get('input[id=datepicker]').type('2018-12-19');
    cy.get('input[id=location]').type('a pineapple under the sea');
    cy.get('#locationID').select('Study Site 1', {force: true});
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
    cy.get('form[id=encounterForm]').submit(); //TODO doubt very highly that this will work because of form submission stuff. Replace with programmatic submission here when you have that ironed out
    cy.url().should('match', /confirmSubmit/);
  });
  it('cannot submit minimal encounter form with missing essential info.', function(){ //TODO fix
    cy.get('input[id=datepicker]').type('2018-12-19');
    cy.get('input[id=location]').type('a pineapple under the sea');
    cy.get('#locationID').select('Study Site 1', {force: true});
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
    cy.get('button[id=submitEncounterButton]').click();
    cy.url().should('not.match', /confirmSubmit/);
  });
  it('correctly fills out encounter form with advanced information', function(){
    cy.get('input[id=datepicker]').type('2018-12-19');
    cy.get('input[id=location]').type('a pineapple under the sea');
    cy.get('#locationID').select('Study Site 1', {force: true});
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
    //TODO find a way to click the advanced info button (push a change with an id to the wildbook repo?)
  });
  it('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });

});
