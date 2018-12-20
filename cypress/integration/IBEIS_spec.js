describe('Tests for when IBEIS rebuilds', function() {
  let baseUrl= 'http://104.42.42.134:5005/';
  it('should get valid JSON results from ___', function(){
    cy.requst({
      Name: 'IBEIS',
      Secret: 'CB73808F-A6F6-094B-5FCD-385EBAFF8FC0',
      Method: 'GET',

      url: baseUrl+'/api/core/',
      headers: {
      },
      form: false,
      body: {
      }
    })
    .then((resp)=>{
      expect(resp.status).to.eq(200);
      cy.log(resp);
    });
  });
});
