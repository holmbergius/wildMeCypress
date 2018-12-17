describe('Wildbook instance encounter page', function() {
  beforeEach(()=>{
    //TODO login
    cy.visit('https://www.flukebook.org/encounters/encounter.jsp?number=07786da3-eda5-4569-a3b6-0566e3b74629');
  });

  it('displays some known text in encounter.jsp', function(){
    cy.contains('Location');
    cy.contains('Date');
    cy.contains('Gallery');
  });

  it('can edit location', function(){
    cy.get('button[id=editLocation]').click();
    cy.get('textarea[name=location]').type('Vancouver, WA');
    cy.get('input[id=addLocation]').click();
    cy.get('#selectCountry').select('United States', {force: true});
    cy.get('input[id=CountryFormBtn]').click();
    cy.get('#selectCode').select('Study Site 1', {force: true});
    cy.get('input[id=setLocationBtn]').click();
    cy.get('input[id=depthInput]').type('1');
    cy.get('input[id=AddDepth]').click();
    cy.get('input[id=lat]').type('45.634268');
    cy.get('input[id=longitude]').type('-122.665984');
    cy.get('input[id=setGPSbutton]').click();
    cy.get('button[id=closeEditLocation]').click();
  });

  it('can edit identity and add to marked individual', function(){
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=individualAddEncounterInput]').type('frumpy'); //TODO add real whale name here
    cy.get('#matchType').select('Pattern match', {force: true});
    cy.get('input[id=Add]').click();
    cy.get('input[id=alternateid]').type('frumpy123');
    cy.get('input[id=setAltIDbtn]').click();
    //TODO LEFT OFF HERE
  });

  it('can edit identity and create new marked individual', function(){
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=createSharkIndividual]').type('frumpy'); //TODO shark Individual Seems Like An Old Name
    cy.get('input[id=createSharkBtn]').click();
    cy.get('input[id=alternateid]').type('frumpy123');
    cy.get('input[id=setAltIDbtn]').click();
    //TODO LEFT OFF HERE
  });

   it('create occurrence and associate current encounter with it', function(){
     cy.get('button[id=editIdentity]').click();
     cy.get('input[id=createOccurrenceInput]').type('testOccurence123');
     cy.get('input[id=createOccur]').click();
   });

   it('add current encounter to known occurence', function(){
     cy.get('button[id=editIdentity]').click();
     cy.get('input[id=add2OccurrenceInput]').type('knownOccurence123'); //TODO do I have to find a real occurence that I can mess with?
     cy.get('input[id=addOccurrence]').click();
     cy.get('button[id=closeEditIdentity]').click();
   });

   it('edits contact info', function(){
    cy.get('button[id=editContactBtn]').click();
    cy.contains('Submitter').should('not.exist');
    //TODO there is a bug here, but I don't know how to fail it. FIX
  });

  it('tests whether metadata should not have two assign to user', function(){
    cy.get('input[id=Assign]').should('not.exist');
    //TODO there is a bug here, but I don't know how to fail it. FIX
  });

  it('edits metadata', function(){
    cy.get('input[id=editMeta]').click();
    cy.get('#selectState').select('unapproved', {force: true});
    cy.get('input[id=editWork]').click();
    cy.get('#submitterSelect').select('atticus29', {force: true});
    cy.get('input[id=Assign]').click();
    cy.get('input[id=tapirApprove]').click();
  });

  it('tests whether tapir link is dead', function(){
    cy.get('input[id=editMeta]').click();
    cy.get('a[href=nulltapirlink]').click();
    cy.contains('404');
  });

  it('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });
});
