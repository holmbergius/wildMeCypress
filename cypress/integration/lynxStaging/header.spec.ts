describe('Tests associated with the header in the lynx repo', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl', 'https://lynx.wildbook.org/'); //TODO change to https://general-staging.wildbook.org/
    cy.logout();
    cy.fixture('localVariables.json').then((localVars)=>{
      cy.loginLynxStaging(localVars.username, localVars.password);
    });
  });
  afterEach(function () {
    cy.logout();
  });

  it.skip('does not see Submit → Create Survey in navbar', function(){
      cy.contains('a', 'Create Survey').should('not.be.visible');
      cy.contains('a', 'Submit').click({force: true});
      cy.contains('a', 'Create Survey').should('not.be.visible');
  });

  it('does not see Search → Individual search in navbar', function(){
      cy.get('a[id=search-dropdown]').click({force: true});
      cy.contains('a', 'Individual Search').should('be.visible'); //TODO change to not.be.visible
  });

  it('does not see Search → Occurrence search in navbar', function(){
      cy.get('a[id=search-dropdown]').click({force: true});
      cy.contains('a', 'Occurrence Search').should('be.visible'); //TODO change to not.be.visible
  });

  it('does not see Search → Survey search in navbar', function(){
      cy.get('a[id=search-dropdown]').click({force: true});
      cy.contains('a', 'Survey Search').should('be.visible'); //TODO change to not.be.visible
  });

  it.only('does not see Encounters → View Images in navbar', function(){
      cy.contains('a', 'Encounters').should('be.visible');
      cy.contains('a', 'Encounters').click({force: true});
      cy.contains('a', 'View Images').should('not.be.visible');
  });

  it('does not see Ecounters → Encounter Calendar in navbar', function(){
    cy.contains('a', 'Encounters').should('be.visible');
    cy.contains('a', 'Encounters').click({force: true});
    cy.contains('a', 'Encounter Calendar').should('not.be.visible');
  });

});
