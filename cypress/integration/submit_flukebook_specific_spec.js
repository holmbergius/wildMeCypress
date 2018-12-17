describe('Wildbook instance login page', function() {
  beforeEach(()=>{
    cy.login();
    cy.visit('/submit.jsp');
  });

  it('displays report an encounter', function(){
    cy.contains('Report an Encounter');
  });

  it('correctly fills out full encounter form without advanced information', function(){
    cy.get('input[id=datepicker]').type('2014-01-05 12:30');
    cy.get('input[id=location]').type('a pineapple under the sea');
    cy.get('#locationID').select('Study Site 1', {force: true});
    cy.get('#countryID').select('United States', {force: true});
    cy.get('input[id=lat]').type('45.590491');
    cy.get('input[id=longitude]').type('-122.72125829999997');
    cy.get('input[id=depth]').type('3');
    cy.get('input[id=submitterName]').type('Mark Fisher');
    cy.get('input[id=submitterEmail]').type('mark.fisher123@gmail.com');
    cy.get('input[id=photographerName]').type('Someguy Imetonthestreet');
    cy.get('input[id=photographerEmail]').type('Someguy.imetonthestreet@gmail.com');
    cy.get('input[id=submitterOrganization]').type('Self');
    cy.get('input[id=submitterProject]').type('PersonalLifeList');
    cy.get('input[id=comments]').type('This is a lot of text fields');
    cy.get('input[id=comments]').type('This is a lot of text fields');
    cy.get('#genusSpecies').select('Megapter novaeangliae', {force: true});
    cy.get('form[id=encounterForm]').submit(); //TODO doubt very highly that this will work because of the captcha stuff
    cy.hash().should('match', '/confirmSubmit/');
    // cy.hash().should('eq','') //TODO new URL starts with confirmSubmit.jsp but then has ?number= something dynamic that I'm not sure how to access from the front end
    // cy.contains('Success'); //TODO not best practice but above statement was too complex


  });

  it('correctly fills out minimal encounter form without advanced information', function(){ //TODO fix
    cy.get('input[id=datepicker]').type('2014-01-05 12:30');
    cy.get('input[id=location]').type('a pineapple under the sea');
    cy.get('#locationID').select('Study Site 1', {force: true});
    cy.get('#countryID').select('United States', {force: true});
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
    cy.get('form[id=encounterForm]').submit(); //TODO doubt very highly that this will work because of the captcha stuff
    cy.url().should('match', /confirmSubmit/);
  });

  it('cannot submit minimal encounter form with missing essential info.', function(){ //TODO fix
    cy.get('input[id=datepicker]').type('2014-01-05 12:30');
    cy.get('input[id=location]').type('a pineapple under the sea');
    cy.get('#locationID').select('Study Site 1', {force: true});
    cy.get('#countryID').select('United States', {force: true});
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
    cy.get('button[id=submitEncounterButton]').click();
    cy.url().should('not.match', /confirmSubmit/);
  });


  it('correctly fills out encounter form with advanced information', function(){
    cy.get('input[id=datepicker]').type('2014-01-05 12:30');
    cy.get('input[id=location]').type('a pineapple under the sea');
    cy.get('#locationID').select('Study Site 1', {force: true});
    cy.get('#countryID').select('United States', {force: true});
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
    //TODO find a way to click the advanced info button (push a change with an id to the wildbook repo?)
  });

  it('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });

});
