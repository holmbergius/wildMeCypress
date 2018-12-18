describe('Wildbook instance encounter page', function() {
  beforeEach(()=>{
    //TODO login is broken!
    cy.login();
    cy.findAndNavigateToFirstUnapprovedEncounter();
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
    cy.get('input[id=countryFormBtn]').click();
    cy.get('#selectCode').select('Study Site 1', {force: true});
    cy.get('input[id=setLocationBtn]').click();
    cy.get('input[id=depthInput]').type('1');
    cy.get('input[id=AddDepth]').click();
    cy.get('input[id=lat]').type('45.634268');
    cy.get('input[id=longitude]').type('-122.665984');
    cy.get('input[id=setGPSbutton]').click({force: true});
    cy.get('button[id=closeEditLocation]').click();
  });

  it('can edit identity and add to marked individual', function(){
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=individualAddEncounterInput]').type('frumpy', {force: true}); //TODO add real whale name here
    cy.get('#matchType').select('Pattern match', {force: true});
    cy.get('input[id=Add]').click({force: true});
    cy.get('input[id=alternateid]').type('frumpy123');
    cy.get('input[id=setAltIDbtn]').click();
  });

  it('can edit identity and create new marked individual', function(){
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=createSharkIndividual]').type('frumpy', {force:true}); //TODO shark Individual Seems Like An Old Name
    cy.get('input[id=createSharkBtn]').click();
    cy.get('input[id=alternateid]').type('frumpy123');
    cy.get('input[id=setAltIDbtn]').click();
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
    cy.contains('null').should('not.exist');
    cy.get('#selectState').select('unapproved', {force: true});
    cy.get('input[id=editWork]').click();
    cy.get('#submitterSelect').select('atticus29', {force: true});
    cy.get('input[id=Assign]').click();
    cy.get('input[id=tapirApprove]').click(); //TODO dare I go into this spooky old tree?
    cy.get('textarea[id=autoComments]').type('this is a cypress test comment');
    cy.get('input[id=manualAdd]').click();
  });

  it('creates and then deletes encounter', function(){
    cy.createAndNavigateToEncounterFlukeBook();
    cy.get('input[id=editMeta]').click();
    cy.get('input[id=deleteButton]').click();
    Cypress.on('window:confirm', (err, runnable) => {
      // return true; //TODO necessary? TODO I suspect this may not work
    });
    cy.contains('I have removed encounter');
  });

  it('tests whether tapir link is dead', function(){
    cy.get('input[id=editMeta]').click();
    cy.contains('null').should('not.exist');
    cy.get('a[href=nulltapirlink]').click(); //TODO will this work?
    cy.contains('404');
  });

  it('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });

  it('adds water temperature and salinity', function(){
    cy.get('input[id=editMeasure]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[id=measurementEvent0]').type('11');
    cy.get('input[id=measurementEvent1]').type('35');
    cy.get('input[id=addMeasurements]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });


  it('adds left tag for tracking', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[name=metalTag(left)]').type('leftTag');
    cy.get('input[id=setMetalTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it('adds right tag for tracking', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[name=metalTag(right)]').type('rightTag');
    cy.get('input[id=setMetalTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it('adds left and right tags for tracking', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[name=metalTag(left)]').type('leftTag');
    cy.get('input[name=metalTag(right)]').type('rightTag');
    cy.get('input[id=setMetalTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it('adds acoustic tag', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[id=acousticTagInput]').type('acousticTagSerial123');
    cy.get('input[id=acousticTagId]').type('acousticTagId123');
    cy.get('input[id=setAcousticTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it('adds satellite tag', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('select[name=satelliteTagName]').select('Wild Life Computers', {force: true});
    cy.get('input[id=satelliteTagSerial]').type('satelliteTagSerial123');
    cy.get('input[id=satelliteTagArgosPttNumber]').type('satelliteTagId123');
    cy.get('input[id=setSatelliteTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it('edits observation attributes', function(){
    cy.get('button[id=editObservation]').click();
    cy.contains('null').should('not.exist');
    cy.get('#genusSpecies').select('Physeter macrocephalus', {force: true});
    cy.get('input[id=taxBtn]').click();
    cy.get('#livingStatus').select('dead', {force: true});
    cy.get('input[id=addStatus]').click();
    cy.get('#selectSex').select('male', {force: true});
    cy.get('input[id=addSex]').click();
    cy.get('textarea[id=scarInput]').type('noticeable scars from a terrifying fight with a giant squid. This whale saved my life!');
    cy.get('input[id=addScar]').click();
    cy.get('textarea[id=behaviorInput]').type('Really seemed to dislike things that look like cephalopods');
    cy.get('input[id=editBehavior]').click();
    cy.get('textarea[id=groupRoleInput]').type('Not a team player');
    cy.get('input[id=editGroupRole]').click();
    cy.get('#colorCode').select('5U', {force: true});
    cy.get('input[id=editPattern]').click();
    cy.get('#lifeStage').select('adult', {force: true});
    cy.get('input[id=addLife]').click();
    cy.get('textarea[id=commentInput]').type('Thanks for saving me, buddy!');
    cy.get('input[id=editComment]').click();
    cy.get('button[id=closeEditObservation]').click();
  });

  it('dynamic properties don’t display null', function(){
    cy.get('input[id=editObservations]').click();
    cy.contains('null').should('not.exist');
  });

  it('adds dynamic property', function(){
    cy.get('input[id=editObservations]').click();
    cy.get('input[id=addDynPropInput]').type('Mystery Property 1');
    cy.get('input[id=addDynPropInput2]').type('Glows under fluorescent light');
    cy.get('input[id=addDynPropBtn]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it('edits existing dynamic property', function(){
    cy.get('input[id=editObservations]').click();
    cy.get('input[id=dynInput]').first().type('Giggles when you tickle it.');
    cy.get('input[id=dynEdit]').first().click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });
});
