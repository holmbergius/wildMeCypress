describe('All live instances should have these tests', function() {
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

  it('cannot log in programmatically using default login', function(){
    //TODO test this
    cy.request({
    method: 'POST',
    url: baseUrl + '/LoginUser',
    form: true,
    body: {
      username:'tomcat',
      password:'tomcat123'
    }
  })
  .then((resp)=>{
    expect(resp.status).to.eq(200);
    cy.log(resp.requestHeaders.cookie);
  });
  });
});
