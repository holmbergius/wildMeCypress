describe('Flukebook specific encounter submission page', function() {
  // beforeEach(()=>{
  // });

  it('cannot use tomcat to log in', function(){
    cy.visit('/logout.jsp');
    cy.visit('/login.jsp');
    cy.url().should('not.match',/welcome/);
    cy.get('input[name=username]').type('tomcat'); //TODO put username in a better place
    cy.get('input[name=password]').type('tomcat123'); //TODO put password in a better place
    cy.get('input[id=logMeIn]').click();
    cy.url().should('not.match',/welcome\.jsp/);
  });
});
