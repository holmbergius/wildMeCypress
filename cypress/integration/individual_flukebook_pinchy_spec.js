describe('Flukebook tests on individual.jsp for Pinchy specifically', function() {
  beforeEach(()=>{
    //TODO login is broken!
    cy.loginProgrammatically();
    cy.visit('/individuals.jsp?number=5560');
  });

  it.skip('confirms that familial relationshipts are being depicted', function(){
    cy.get('a').contains('Familial Diagram').click();
    cy.get('text').contains('mother').should('exist');
  });


  it.skip('confirms that the social relationships table displays info', function(){
    cy.get('a').contains('Social Relationships Table').click();
    cy.get('table[id=relationshipTable]').should('contain','Relationship With');
    cy.get('table[id=relationshipTable]').should('contain','CommunityMembership');
  });

  it('clicks no co-occurence diagram and sees stuff', function(){
    cy.get('a').contains('Co-occurrences Diagram').should('exist');
    cy.get('svg .bubbleChart').should('exist');
    cy.get('circle').should('exist');
  });

  it.skip('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
});
