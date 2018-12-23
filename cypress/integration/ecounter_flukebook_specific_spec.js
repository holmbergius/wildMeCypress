//TODO test all of these again
describe('Wildbook instance encounter page tests that only need me to log in once', function() {
  beforeEach(()=>{ //why before each? Because I don't want the UI changes to accumulate state changes
  cy.logout();
  cy.loginProgrammatically();
  cy.createAndNavigateToEncounterFlukeBook();
});

afterEach(function () {
  cy.deleteEncounterFlukebook();
})

it.skip('tests whether createAndNavigateToEncounterFlukeBook works', function(){
  cy.createAndNavigateToEncounterFlukeBook();
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
  cy.get('button[id=editIdentity]').click();
  cy.get('input[id=alternateid]').type('frumpy123');
  cy.get('input[id=setAltIDbtn]').click();
  cy.get('button[id=closeEditIdentity]').click();
  cy.contains('frumpy123').should('exist');
});

it.skip('creates occurrence', function(){
  cy.get('button[id=editIdentity]').click();
  let randomNumString = Math.random().toString()
  cy.get('input[id=createOccurrenceInput]').type('testOccurrence123' + randomNumString);
  cy.get('input[id=createOccur]').click();
  cy.get('button[id=closeEditIdentity]').click();
  cy.contains(/Occurrence ID:\s*testOccurrence/).should('exist');
});

it.skip('adds to occurrence', function(){
  cy.get('button[id=editIdentity]').click();
  cy.get('input[id=add2OccurrenceInput]').type('knownOccurrence123', {force:true}); //TODO do I have to find a real occurrence that I can mess with?
  cy.get('input[id=addOccurrence]').click({force:true});
  cy.get('button[id=closeEditIdentity]').click();
  //TODO add assert
});

it.skip('edits contact info', function(){
  cy.get('button[id=editContactBtn]').click();
  cy.contains('Submitter').should('not.exist');
  //TODO there is a bug here, but I don't know how to fail it. FIX
});

it.skip('tests whether metadata should not have two assign to user', function(){
  cy.get('input[id=Assign]').should('not.exist');
  //TODO there is a bug here on flukebook, but I don't know how to fail it. FIX
});

it.skip('assign to user dropdown should not contain null', function(){
  cy.get('button[id=editMeta]').click();
  cy.get('#submitterSelect').contains('null').should('not.exist');
  //ATTN a known bug in wildbook
});

it.skip('assigns approved state and then changes to unapproved state', function(){
  cy.get('button[id=editMeta]').click();
  cy.get('#selectState').select('approved', {force: true});
  cy.get('input[id=editWork]').click();
  cy.get('span[id=displayWork]').contains('approved');
  cy.get('#selectState').select('unapproved', {force: true});
  cy.get('input[id=editWork]').click();
  cy.get('span[id=displayWork]').contains('unapproved');
});

it.skip('assigns to user', function(){
  cy.get('button[id=editMeta]').click();
  cy.get('#submitterSelect').select('tomcat', {force: true});
  cy.get('input[id=Assign]').click();
  cy.url().should('match', /EncounterSetSubmitterID/);
  cy.contains('Action results');
});


it.skip('clicks tapir approve', function(){
  cy.get('button[id=editMeta]').click();
  cy.get('input[id=tapirApprove]').click();
  cy.contains('Action results');
  cy.contains('TapirLink exposure status');
  //TODO currently fails when it shouldn't see JIRA issue WHALESHARK-29 ("Uncaught SyntaxError: Unexpected token < in encounter.jsp")
});

it.skip('edits metadata comments', function(){
  cy.get('button[id=editMeta]').click();
  cy.get('textarea[id=autoComments]').type('this is a cypress test comment');
  cy.get('input[id=manualAdd]').click();
});

it.skip('tests whether tapir link is dead', function(){
  cy.get('button[id=editMeta]').click();
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
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
});


it.skip('adds left tag for tracking', function(){
  cy.get('button[id=editTracking]').click();
  cy.contains('null').should('not.exist');
  cy.get('input[name=metalTag(left)]').type('leftTag');
  cy.get('input[id=setMetalTags]').click();
  cy.contains('Action results');
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
});

it.skip('adds right tag for tracking', function(){
  cy.get('button[id=editTracking]').click();
  cy.contains('null').should('not.exist');
  cy.get('input[name=metalTag(right)]').type('rightTag');
  cy.get('input[id=setMetalTags]').click();
  cy.contains('Action results');
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
});

it.skip('adds left and right tags for tracking', function(){
  cy.get('button[id=editTracking]').click();
  cy.contains('null').should('not.exist');
  cy.get('input[name=metalTag(left)]').type('leftTag');
  cy.get('input[name=metalTag(right)]').type('rightTag');
  cy.get('input[id=setMetalTags]').click();
  cy.contains('Action results');
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
});

it.skip('adds acoustic tag', function(){
  cy.get('button[id=editTracking]').click();
  cy.contains('null').should('not.exist');
  cy.get('input[id=acousticTagInput]').type('acousticTagSerial123');
  cy.get('input[id=acousticTagId]').type('acousticTagId123');
  cy.get('input[id=setAcousticTags]').click();
  cy.contains('Action results');
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
});

it.skip('adds satellite tag', function(){
  cy.get('button[id=editTracking]').click();
  cy.contains('null').should('not.exist');
  cy.get('select[name=satelliteTagName]').select('Wild Life Computers', {force: true});
  cy.get('input[id=satelliteTagSerial]').type('satelliteTagSerial123');
  cy.get('input[id=satelliteTagArgosPttNumber]').type('satelliteTagId123');
  cy.get('input[id=setSatelliteTags]').click();
  cy.contains('Action results');
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
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
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
});

it.skip('edits existing dynamic property', function(){
  cy.get('input[id=editObservations]').click();
  cy.get('input[id=dynInput]').first().type('Giggles when you tickle it.');
  cy.get('input[id=dynEdit]').first().click();
  cy.contains('Action results');
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
});

it.skip('adds biological sample with minimal input', function(){
  cy.get('a').contains('Add biological sample').click();
  cy.get('input[name=sampleID]').first().type("bioSample123");
  cy.get('input[name=alternateSampleID]').type("bioSample123AltId");
  cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('of undefined')
    // done()
    // return false
  });
  cy.get('input[name=EditTissueSample]').first().click();
  cy.url().should('match',/EncounterSetTissueSample/);
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
  cy.contains(/Alternate Sample ID:\s*bioSample123AltId/).should('exist');
});

it.skip('adds biological sample with maximal input', function(){
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
  cy.get('a').contains('Return to encounter').click();
  cy.url().should('match', /encounter.jsp/);
  cy.contains(/Collection code:\s*ws1/).should('exist');
  cy.contains(/Collection ID:\s*whaleSearch1/).should('exist');
  cy.contains(/Dataset ID:\s*summonedWhales/).should('exist');
  cy.contains(/Dataset name:\s*Summoned Whales/).should('exist');
  cy.contains(/Event remarks:\s*You would think this could bw in the field notes/).should('exist');
  cy.contains(/Field number:\s*uncountable/).should('exist');
  cy.contains(/Institution ID:\s*Hogwarts/).should('exist');
  cy.contains(/Sampling effort:\s*maximal/).should('exist');
  cy.contains(/Sampling protocol:\s*dark summoning/).should('exist');
  cy.contains(/Alternate Sample ID:\s*bioSample123AltId/).should('exist');
  cy.contains(/Preservation method:\s*watercolor painting/).should('exist');
  cy.contains(/Storage lab ID:\s*bioSample123Lab456/).should('exist');
});

it.skip('edits date', function(){
  cy.get('button[id=editDate]').click();
  cy.get('input[id=datepickerField]').type('2018-12-21 05:00');
  cy.get('input[id=addResetDate]').click({force: true});
  cy.get('button[id=closeEditDate]').click();
  cy.contains('2018-12-21 05:00');
  //TODO I don't understand why this test fails; it shouldn't
});

});

describe('Flukebook instance encounter page no delete after each', function() {
  beforeEach(()=>{
    cy.loginProgrammatically();
    cy.createAndNavigateToEncounterFlukeBook();
  });

  it.skip('creates and then deletes encounter', function(){
    cy.deleteEncounterFlukebook();
    cy.url().should('match',/EncounterDelete/);
    cy.contains('I have removed encounter');
    cy.go('back');
    cy.contains('There is no corresponding encounter number in the database');
  });

  it.skip('adds and removes adoption', function(){
    cy.get('a').contains('Add adoption').click({timeout: 60000});
    cy.get('p').contains('I could not find the adoption null').should('not.exist');
    //TODO test whether this fails because of a bug like it does in generic wildbook
    //TODO move out of Wildbook instance encounter page no delete after each after it starts passing
  });

  it.skip('adds image to encounter', function(){
    cy.get('input[id=file-chooser]').click();
    //TODO do things
    cy.get('input[id=upload-button]').click();
    cy.contains('Upload complete. Refresh page to see new image.');
  });
});
//TODO maybe missing at the end }); ?

describe('Flukebook instance encounter page no after each and no before each', function() {
 it.skip('adds image to encounter', function(){
    cy.loginProgrammatically();
    cy.visit('/encounters/encounter.jsp?number=861d46de-52bb-4ab7-8f76-efda110854c9');
    cy.uploadFile('#file-chooser','fluke_manip.jpg');
  });
});


//TODO removing marked individual from encounter is a mess. Test for this.
