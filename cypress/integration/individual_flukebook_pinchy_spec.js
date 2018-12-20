describe('Flukebook tests on individual.jsp for Pinchy specifically', function() {
  beforeEach(()=>{
    //TODO login is broken!
    cy.loginProgrammatically();
    cy.visit('/individuals.jsp?number=5560'); //TODO test OM02-017 again //5560
  });

  it.skip('confirms that familial relationshipts are being depicted', function(){
    cy.get('a').contains('Familial Diagram').click();
    cy.get('text').contains('mother').should('exist');
  });


  it.skip('confirms that the social relationships table displays info', function(){
    cy.get('table[id=relationshipTable]').should('not.contain','Relationship With');
    cy.get('table[id=relationshipTable]').should('not.contain','CommunityMembership');
    cy.get('a').contains('Social Relationships Table').click();
    cy.get('table[id=relationshipTable]').should('contain','Relationship With');
    cy.get('table[id=relationshipTable]').should('contain','CommunityMembership');
  });

  it.skip('clicks on co-occurence diagram and sees stuff', function(){
    cy.get('a').contains('Co-occurrences Diagram').should('exist');
    cy.get('a').contains('Co-occurrences Diagram').click();
    //TODO improve me currently trivial but passing
    // cy.get('svg').filter('.bubbleChart',{timeout:20000}).should('exist');
    // cy.get('circle').should('exist');
  });

  it.skip('click on co-occurrence table and sees entries', function(){
    cy.get('div[id=cooccurrenceTable]').should('not.be.visible');
    cy.get('a').contains('Co-occurrences Table').should('exist');
    cy.get('a').contains('Co-occurrences Table').click();
    cy.get('div[id=cooccurrenceTable]').should('be.visible');
    cy.get('div[id=cooccurrenceTable]').find('tbody > tr > td',{timeout: 60000}).contains('5130').should('be.visible');
  });

  it('encounter table contains entries', function(){
    cy.get('a').contains('Encounter(s) (not all may be currently visible)').click();

  });

  it.skip('biological samples table contains entries', function(){
    cy.get('a').contains('Biological Samples').click();

  });

  it.skip('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
});
