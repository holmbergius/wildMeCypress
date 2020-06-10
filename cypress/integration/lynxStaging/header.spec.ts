describe('Tests associated with the header in the lynx repo', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl', 'https://lynx.wildbook.org/'); //production URL: https://lynx.wildbook.org/ https://general-staging.wildbook.org/
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

  it('does not see Participate in navbar', function(){
    cy.contains('a', 'Partcipate').should('not.exist');
    cy.contains('a', 'User Agreement').should('not.exist');
  });

  it('sees report an encounter in navbar', function(){
    cy.get('a[id=report-encounter-header]').should('be.visible');
  });

  it('sees admin only when logged in as admin', function(){
    cy.logout();
    cy.reload({forceReload: true});
    cy.contains('a','Admin').should('not.be.visible');
    cy.fixture('localVariables.json').then((localVars)=>{
      cy.loginLynxStaging(localVars.username, localVars.password);
      cy.contains('a','Admin').should('be.visible');
    });
    cy.logout();
    cy.reload({forceReload: true});
    cy.fixture('localVariables.json').then((localVars)=>{
      cy.log(localVars.researcherUsername);
      cy.loginLynxStaging(localVars.researcherUsername, localVars.researcherPassword);
      // cy.reload({forceReload: true});
      cy.contains('a','Admin').should('not.be.visible');
      cy.get('a[id=report-encounter-header]').should('be.visible');
    });
  });

});
