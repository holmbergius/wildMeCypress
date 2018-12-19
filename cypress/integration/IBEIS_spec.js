describe('Tests for when IBEIS rebuilds', function() {
  let baseUrl= 'http://104.42.42.134:5005/';
  it('should get valid JSON results from ___', function(){
    cy.requst({
      method: 'POST',
      url: baseUrl+'TODO',
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
