describe('Tests associated with the header in the lynx repo', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl', 'https://general-staging.wildbook.org/'); //production URL: https://lynx.wildbook.org/ https://general-staging.wildbook.org/
    cy.logout();
    cy.fixture('localVariables.json').then((localVars)=>{
      cy.loginLynxStaging(localVars.username, localVars.password);
    });
  });
  afterEach(function () {
    cy.logout();
  });

  it('does not see Submit → Create Survey in navbar', function(){
      cy.contains('a', 'Create Survey').should('not.exist');
      cy.contains('a', 'Submit').should('not.exist');
      // cy.contains('a', 'Submit').click({force: true});
      cy.contains('a', 'Create Survey').should('not.exist');
  });

  it('does not see Search → Individual search in navbar', function(){
      cy.get('a[id=search-dropdown]').should('not.exist');
      cy.contains('a', 'Individual Search').should('not.exist');
  });

  it('does not see Search → Occurrence search in navbar', function(){
      cy.get('a[id=search-dropdown]').should('not.exist');
      cy.contains('a', 'Occurrence Search').should('not.exist');
  });

  it('does not see Search → Survey search in navbar', function(){
      cy.get('a[id=search-dropdown]').should('not.exist');
      cy.contains('a', 'Survey Search').should('not.exist');
  });

  it('does not see Encounters → View Images in navbar', function(){
      cy.contains('a', 'Encounters').should('be.visible');
      cy.contains('a', 'Encounters').click({force: true});
      cy.contains('a', 'View Images').should('not.exist');
  });

  it('does not see Ecounters → Encounter Calendar in navbar', function(){
    cy.contains('a', 'Encounters').should('be.visible');
    cy.contains('a', 'Encounters').click({force: true});
    cy.contains('a', 'Encounter Calendar').should('not.exist');
  });

  it.('does not see Participate in navbar', function(){
    cy.contains('a', 'Partcipate').should('not.exist');
    cy.contains('a', 'User Agreement').should('not.exist');
  });

});