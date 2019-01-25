describe('Tests for when IBEIS rebuilds', function() {
  beforeEach(()=>{
    Cypress.config('baseUrl','http://104.42.42.134/');
  });

it.skip('should get valid JSON results from ___', function(){
    cy.requst({
      Name: 'IBEIS',
      Secret: 'CB73808F-A6F6-094B-5FCD-385EBAFF8FC0',
      Method: 'GET',
      url: Cypress.config(baseUrl)+'/api/core/',
      headers: {
      },
      form: false,
      body: {
      }
    })
    .then((resp)=>{
      console.log(resp);
      cy.log(resp);
      expect(resp.status).to.eq(200);
    });
  });
});
