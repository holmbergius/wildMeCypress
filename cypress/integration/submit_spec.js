describe('Generic wildbook instance encounter submission page', function() {
  beforeEach(()=>{
    cy.login();
    cy.visit('/submit.jsp');
  });
it.skip('displays report an encounter', function(){
    cy.contains('Report an Encounter');
  });
it.skip('correctly fills out full encounter form without advanced information', function(){
    cy.get('input[id=datepicker]').type('2014-01-05 12:30');
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
    cy.url().should('match', /confirmSubmit/);
  });
it.skip('correctly fills out minimal encounter form without advanced information', function(){ //TODO fix
    cy.get('input[id=datepicker]').type('2014-01-05 12:30');
    cy.get('input[id=location]').type('a pineapple under the sea');
    cy.get('input[id=submitterName]').type('Mark Fisher');
    cy.get('input[id=submitterEmail]').type('mark.fisher123@gmail.com');
    cy.get('button[id=submitEncounterButton]').click();
    cy.url().should('match', /confirmSubmit/);
  });
  it('incorrectly fills out minimal encounter form without advanced information', function(){ //TODO fix
      cy.get('input[id=datepicker]').type('2014-01-05 12:30');
      cy.get('input[id=location]').type('a pineapple under the sea');
      cy.get('input[id=submitterName]').click().clear();
      cy.get('input[id=submitterEmail]').type('mark.fisher123@gmail.com');
      cy.get('button[id=submitEncounterButton]').click();
      cy.url().should('not.match', /confirmSubmit/);
      //ATTN known bug. This test should pass, but it doesn't because of a bug in wildbook
    });
it.skip('cannot submit minimal encounter form with missing essential info.', function(){ //TODO fix
    cy.get('input[id=datepicker]').type('2014-01-05 12:30');
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
    cy.url().should('not.match', /confirmSubmit/);
  });
it.skip('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
it.skip('map does not load in local instance', function(){
    cy.get('p[id=map_canvas]').should('be.visible');
    cy.get('p[id=map_canvas]').find('div').contains('Oops! Something went wrong.').should('exist');
  });

});
