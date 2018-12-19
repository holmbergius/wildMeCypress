describe('Wildbook instance encounter page tests that only need me to log in once', function() {
  // before(function() {
  //   cy.logout();
  //   cy.loginProgrammatically();
  // });
  beforeEach(()=>{ //why before each? Because I don't want the UI changes to accumulate state changes
    // cy.createAndNavigateToEncounterFlukeBook();
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      done()
      return false
    });
    cy.logout();
    cy.loginProgrammatically();
    cy.findAndNavigateToFirstUnapprovedPortlandEncounter(); //TODO can speed this up still
  });

  it.skip('displays some known text in encounter.jsp', function(){
    cy.contains('Location');
    cy.contains('Date');
    cy.contains('Gallery');
  });

  it.skip('can edit location', function(){
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

  it.skip('can add to marked individual', function(){
    // cy.createAndNavigateToEncounterFlukeBook();
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=individualAddEncounterInput]').type('frumpy', {force: true}); //TODO add real whale name here
    cy.get('#matchType').select('Pattern match', {force: true});
    cy.get('input[id=Add]').click({force: true});
    cy.get('button[id=closeEditIdentity]').click();
    cy.contains('frumpy');
  });

  it.skip('can create marked individual', function(){
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=createSharkIndividual]').type('frumpy', {force:true}); //TODO shark Individual Seems Like An Old Name
    cy.get('input[id=createSharkBtn]').click();
    cy.get('input[id=alternateid]').type('frumpy123');
    cy.get('input[id=setAltIDbtn]').click();
    cy.get('button[id=closeEditIdentity]').click();
    cy.contains('frumpy123');
  });

  it.skip('add alternate id', function(){
    //TODO why not clickable
    //TODO update createAndNavigateToEncounterFlukeBook and change here
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=alternateid]').type('frumpy123');
    cy.get('input[id=setAltIDbtn]').click();
  });

   it.skip('creates occurrence', function(){
     cy.get('button[id=editIdentity]').click();
     cy.get('input[id=createOccurrenceInput]').type('testOccurence123');
     cy.get('input[id=createOccur]').click();
     //TODO add assert
   });

   it.skip('adds to occurence', function(){
     cy.get('button[id=editIdentity]').click();
     cy.get('input[id=add2OccurrenceInput]').type('knownOccurence123'); //TODO do I have to find a real occurence that I can mess with?
     cy.get('input[id=addOccurrence]').click();
     cy.get('button[id=closeEditIdentity]').click();
   });

   it.skip('edits contact info', function(){
    cy.get('button[id=editContactBtn]').click();
    cy.contains('Submitter').should('not.exist');
    //TODO there is a bug here, but I don't know how to fail it. FIX
  });

  it.skip('tests whether metadata should not have two assign to user', function(){
    cy.get('input[id=Assign]').should('not.exist');
    //TODO there is a bug here, but I don't know how to fail it. FIX
  });

  it.skip('edits metadata', function(){
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

  it.skip('creates and then deletes encounter', function(){
    cy.createAndNavigateToEncounterFlukeBook();
    cy.get('input[id=editMeta]').click();
    cy.get('input[id=deleteButton]').click();
    Cypress.on('window:confirm', (err, runnable) => {
      // return true; //TODO necessary? TODO I suspect this may not work
    });
    cy.contains('I have removed encounter');
  });

  it.skip('tests whether tapir link is dead', function(){
    cy.get('input[id=editMeta]').click();
    cy.contains('null').should('not.exist');
    cy.get('a[href=nulltapirlink]').click(); //TODO will this work?
    cy.contains('404');
  });

  it.skip('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });

  it.skip('adds water temperature and salinity', function(){
    cy.get('input[id=editMeasure]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[id=measurementEvent0]').type('11');
    cy.get('input[id=measurementEvent1]').type('35');
    cy.get('input[id=addMeasurements]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });


  it.skip('adds left tag for tracking', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[name=metalTag(left)]').type('leftTag');
    cy.get('input[id=setMetalTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it.skip('adds right tag for tracking', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[name=metalTag(right)]').type('rightTag');
    cy.get('input[id=setMetalTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it.skip('adds left and right tags for tracking', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[name=metalTag(left)]').type('leftTag');
    cy.get('input[name=metalTag(right)]').type('rightTag');
    cy.get('input[id=setMetalTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it.skip('adds acoustic tag', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('input[id=acousticTagInput]').type('acousticTagSerial123');
    cy.get('input[id=acousticTagId]').type('acousticTagId123');
    cy.get('input[id=setAcousticTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it.skip('adds satellite tag', function(){
    cy.get('button[id=editTracking]').click();
    cy.contains('null').should('not.exist');
    cy.get('select[name=satelliteTagName]').select('Wild Life Computers', {force: true});
    cy.get('input[id=satelliteTagSerial]').type('satelliteTagSerial123');
    cy.get('input[id=satelliteTagArgosPttNumber]').type('satelliteTagId123');
    cy.get('input[id=setSatelliteTags]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it.skip('edits observation attributes', function(){
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

  it.skip('dynamic properties don’t display null', function(){
    cy.get('input[id=editObservations]').click();
    cy.contains('null').should('not.exist');
  });

  it.skip('adds dynamic property', function(){
    cy.get('input[id=editObservations]').click();
    cy.get('input[id=addDynPropInput]').type('Mystery Property 1');
    cy.get('input[id=addDynPropInput2]').type('Glows under fluorescent light');
    cy.get('input[id=addDynPropBtn]').click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it.skip('edits existing dynamic property', function(){
    cy.get('input[id=editObservations]').click();
    cy.get('input[id=dynInput]').first().type('Giggles when you tickle it.');
    cy.get('input[id=dynEdit]').first().click();
    cy.contains('Action results');
    cy.get('a').click(); //TODO how to access this view encounter link?
  });

  it('adds biological sample with minimal input', function(){
    cy.get('a').contains('Add biological sample').click();
    cy.get('input[name=sampleID]').first().type("bioSample123");
    cy.get('input[name=alternateSampleID]').type("bioSample123AltId");
    cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
      // done()
      // return false
    });
    cy.get('input[name=EditTissueSample]').first().click();
    cy.contains('Action results');
  });

  it('adds biological sample with maximal input', function(){
    cy.on('uncaught:exception', (err, runnable) => {
    // expect(err.message).to.include('of undefined')
      // done()
      return false;
    });
    cy.get('a').contains('Add biological sample').click();
    cy.get('input[name=sampleID]').first().type("bioSample123");
    cy.get('input[name=alternateSampleID]').first().type("bioSample123AltId");
    cy.get('input[name=preservationMethod]').type('watercolor painting');
    cy.get('input[name=storageLabID]').type('bioSample123Lab456');
    cy.get('input[name=samplingProtocol]').type('dark summoning');
    cy.get('input[name=samplingEffort]').type('maximal');
    cy.get('input[name=fieldNumber]').type('uncountable');
    cy.get('input[name=fieldNNotes]').type('Fred dropped the blood candles again. Thanks, Fred.');
    cy.get('input[name=eventRemarks]').type('You would think this could bw in the field notes');
    cy.get('input[name=institutionID]').type('Hogwarts');
    cy.get('input[name=collectionID]').type('whaleSearch1');
    cy.get('input[name=collectionCode]').type('ws1');
    cy.get('input[name=datasetID]').type('summonedWhales');
    cy.get('input[name=datasetName]').type('Summoned Whales');
    cy.get('input[name=EditTissueSample]').first().click();
    cy.url().should('match',/EncounterSetTissueSample/);
    cy.contains('Action results');
  });

});