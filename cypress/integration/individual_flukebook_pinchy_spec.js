describe('Flukebook tests on individual.jsp for Pinchy specifically', function() {
  beforeEach(()=>{
    cy.config('baseUrl','https://www.flukebook.org');
    cy.loginProgrammatically();
    cy.visit('/individuals.jsp?number=5560'); //TODO test OM02-017 again //5560
  });

  it('confirms that familial relationshipts are being depicted', function(){
    cy.get('a').contains('Familial Diagram').click();
    cy.get('text').contains('mother').should('exist');
  });


  it('confirms that the social relationships table displays info', function(){
    cy.get('table[id=relationshipTable]').should('not.contain','Relationship With');
    cy.get('table[id=relationshipTable]').should('not.contain','CommunityMembership');
    cy.get('a').contains('Social Relationships Table').click();
    cy.get('table[id=relationshipTable]').should('contain','Relationship With');
    cy.get('table[id=relationshipTable]').should('contain','CommunityMembership');
  });

  it('clicks on co-occurrence diagram and sees stuff', function(){
    cy.get('a').contains('Co-occurrences Diagram').should('exist');
    cy.get('a').contains('Co-occurrences Diagram').click();
    //TODO improve me currently trivial but passing
    // cy.get('svg').filter('.bubbleChart',{timeout:20000}).should('exist');
    // cy.get('circle').should('exist');
  });

  it('click on co-occurrence table and sees entries', function(){
    cy.get('div[id=cooccurrenceTable]').find('tbody > tr > td',{timeout: 60000}).contains('5130').should('not.be.visible');
    cy.get('div[id=cooccurrenceTable]').should('not.be.visible');
    cy.get('a').contains('Co-occurrences Table').should('exist');
    cy.get('a').contains('Co-occurrences Table').click();
    cy.get('div[id=cooccurrenceTable]').should('be.visible');
    cy.get('div[id=cooccurrenceTable]').find('tbody > tr > td',{timeout: 60000}).contains('5130').should('be.visible');
  });

  it('encounter table contains entries (and should be visible straight away)', function(){
    cy.get('a').contains('Encounter(s) (not all may be currently visible)').click();
    cy.get('div[id=encountersTable]').find('tbody > tr > td',{timeout: 60000}).contains('2012-05-08').should('be.visible');
  });

  it('biological samples table contains entries', function(){
    cy.get('div[id=bioSamplesTable]').find('tbody > tr > td',{timeout: 60000}).contains('5560_SAMPLE').should('not.be.visible');
    cy.get('a').contains('Biological Samples').click();
    cy.get('div[id=bioSamplesTable]').find('tbody > tr > td',{timeout: 60000}).contains('5560_SAMPLE').should('be.visible');
  });

 it('can find a loaded map', function(){
    cy.get('div[id=map_canvas]').should('be.visible');
    cy.get('div[id=map_canvas]').find('div').contains('Oops! Something went wrong.').should('not.exist'); //ATTN I think. Hard to test this one. I tested on local instance with the map that doens't load in submit.jsp
  });

 it('should not contain null text', function() {
    //TODO I think this test looks for not just null text, but null anything. Improve
    cy.contains('null').should('not.exist');
  });
});
