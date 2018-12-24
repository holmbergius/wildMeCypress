describe('Wildbook instance encounter page', function() {
  beforeEach(()=>{
    cy.logout();
    cy.login();
    cy.createAndNavigateToEncounterWildbookGeneric();
  });

  afterEach(function () {
    cy.deleteEncounterGeneric();
  });

it('creates and navigates to encounter successfully', function(){
    cy.url().should('match', /encounter.jsp/);
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
    cy.get('#selectCode').select('1', {force: true});
    cy.get('input[id=setLocationBtn]').click();
    cy.get('input[id=depthInput]').type('1');
    cy.get('input[id=AddDepth]').click();
    cy.get('input[id=lat]').type('45.634268');
    cy.get('input[id=longitude]').type('-122.665984');
    cy.get('input[id=setGPSbutton]').click({force: true});
    cy.get('button[id=closeEditLocation]').click();
  });
it('can set new or existing individual ID', function(){
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=individualAddEncounterInput]').type('frumpy', {force: true});
    cy.get('#matchType').select('Pattern match', {force: true});
    cy.get('input[id=Add]').click({force: true});
    cy.get('button[id=closeEditIdentity]').click();
    cy.contains('frumpy');
  });
it('add alternate id', function(){
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=alternateid]').type('frumpy123');
    cy.get('input[id=setAltIDbtn]').click();
    cy.get('button[id=closeEditIdentity]').click();
    cy.contains('frumpy123').should('exist');
  });
it('creates occurrence', function(){
     cy.get('button[id=editIdentity]').click();
     let randomNumString = Math.random().toString()
     cy.get('input[id=createOccurrenceInput]').type('testOccurrence' + randomNumString);
     cy.get('input[id=createOccur]').click();
     cy.get('button[id=closeEditIdentity]').click();
     cy.contains(/Occurrence ID:\s*testOccurrence/).should('exist');
   });
it('adds to occurrence', function(){
     cy.get('button[id=editIdentity]').click();
     cy.get('input[id=add2OccurrenceInput]').type('knownOccurrence123'); //TODO do I have to find a real occurrence that I can mess with?
     cy.get('input[id=addOccurrence]').click();
     cy.get('button[id=closeEditIdentity]').click();
     //TODO add assert
   });
it('edits contact info', function(){
    cy.get('button[id=editContactBtn]').click();
    cy.contains('Submitter').should('not.exist');
    //ATTN a known bug: this is auto-failing because currently edit contact button doesn't do anything
  });

it('assign to user dropdown should not contain null', function(){
    cy.get('button[id=editMeta]').click();
    cy.get('#submitterSelect').contains('null').should('not.exist');
    //ATTN a known bug in wildbook
  });

it('assigns approved state and then changes to unapproved state', function(){
    cy.get('button[id=editMeta]').click();
    cy.get('#selectState').select('approved', {force: true});
    cy.get('input[id=editWork]').click();
    cy.get('span[id=displayWork]').contains('approved');
    cy.get('#selectState').select('unapproved', {force: true});
    cy.get('input[id=editWork]').click();
    cy.get('span[id=displayWork]').contains('unapproved');
  });

it('assigns to user', function(){
    cy.get('button[id=editMeta]').click();
    cy.get('#submitterSelect').select('tomcat', {force: true});
    cy.get('input[id=Assign]').click();
    cy.url().should('match', /EncounterSetSubmitterID/);
    cy.contains('Action results');
  });

it('clicks tapir approve', function(){
    cy.get('button[id=editMeta]').click();
    cy.get('input[id=tapirApprove]').click();
    cy.contains('Action results');
    cy.contains('TapirLink exposure status');
    //TODO currently fails when it shouldn't see JIRA issue WHALESHARK-29 ("Uncaught SyntaxError: Unexpected token < in encounter.jsp")
  });

it('edits metadata comments', function(){
    cy.get('button[id=editMeta]').click();
    cy.get('textarea[id=autoComments]').type('this is a cypress test comment');
    cy.get('input[id=manualAdd]').click();
  });

it('should not contain null text', function() {
    cy.contains('null').should('not.exist');
  });

it('adds measurement', function(){
    cy.get('button[id=editMeasure]').click();
    cy.get('input[id=measurementEvent0]').type('11');
    cy.get('#selectMeasurement').select('directly measured', {force: true});
    cy.get('input[id=addMeasurements]').click();
    cy.contains('Action results');
    cy.get('a').contains('Return to encounter').click();
    cy.url().should('match', /encounter.jsp/);
  });

it('adds left tag for tracking', function(){
    cy.get('button[id=editTracking]').click();
    cy.get('input[id=metalTagLocationleft]').type('leftTag');
    cy.get('input[id=setMetalTags]').click();
    cy.contains('Action results');
    cy.get('a').contains('Return to encounter').click();
    cy.url().should('match', /encounter.jsp/);
    cy.contains('Left: leftTag');
  });

it('adds right tag for tracking', function(){
    cy.get('button[id=editTracking]').click();
    cy.get('input[id=metalTagLocationright]').type('rightTag');
    cy.get('input[id=setMetalTags]').click();
    cy.contains('Action results');
    cy.get('a').contains('Return to encounter').click();
    cy.url().should('match', /encounter.jsp/);
    cy.contains('Right: rightTag');
  });

it('adds left and right tags for tracking', function(){
    cy.get('button[id=editTracking]').click();
    cy.get('input[id=metalTagLocationright]').type('rightTag');
    cy.get('input[id=metalTagLocationleft]').type('leftTag');
    cy.get('input[id=setMetalTags]').click();
    cy.contains('Action results');
    cy.get('a').contains('Return to encounter').click();
    cy.url().should('match', /encounter.jsp/);
    cy.contains('Right: rightTag');
    cy.contains('Left: leftTag');
  });

it('adds acoustic tag', function(){
    cy.get('button[id=editTracking]').click();
    cy.get('input[id=acousticTagInput]').type('acousticTagSerial123');
    cy.get('input[id=acousticTagId]').type('acousticTagId123');
    cy.get('input[id=setAcousticTags]').click();
    cy.contains('Action results');
    cy.get('a').contains('Return to encounter').click();
    cy.url().should('match', /encounter.jsp/);
    cy.contains('Serial number: acousticTagSerial123');
  });

it('adds satellite tag', function(){
    cy.get('button[id=editTracking]').click();
    cy.get('select[name=satelliteTagName]').select('Wild Life Computers', {force: true});
    cy.get('input[id=satelliteTagSerial]').type('satelliteTagSerial123');
    cy.get('input[id=satelliteTagArgosPttNumber]').type('satelliteTagId123');
    cy.get('input[id=setSatelliteTags]').click();
    cy.contains('Action results');
    cy.get('a').contains('Return to encounter').click();
    cy.url().should('match', /encounter.jsp/);
    cy.contains(/Name\s*Wild Life Computers/);
    cy.contains(/Serial number:\s*satelliteTagSerial123/);
    cy.contains(/Argos PTT:\s*satelliteTagId123/);
  });

it('edits observation attributes', function(){
    cy.get('button[id=editObservation]').click();
    cy.get('#livingStatus').select('dead', {force: true});
    cy.get('input[id=addStatus]').click();
    cy.get('#selectSex').select('male', {force: true});
    cy.get('input[id=addSex]').click();
    cy.get('textarea[id=scarInput]').type('noticeable scars from a terrifying fight with a giant squid. This whale saved my life!');
    cy.get('input[id=addScar]').click();
    cy.get('textarea[id=behaviorInput]').type('Really seemed to dislike things that look like cephalopods');
    cy.get('input[id=editBehavior]').click();
    cy.get('textarea[id=commentInput]').type('Thanks for saving me, buddy!');
    cy.get('input[id=editComment]').click();
    cy.get('button[id=closeEditObservation]').click();
    cy.contains(/Status:\s*dead/);
    cy.contains(/Sex:\s*male/);
    cy.contains(/Noticeable scarring:\s*noticeable scars from a terrifying fight with a giant squid. This whale saved my life!/);
    cy.contains(/Behavior:\s*Really seemed to dislike things that look like cephalopods/);
    cy.get('#displayComment').contains(/Thanks for saving me, buddy!/);
  });

it('dynamic properties don’t display null', function(){
    //I think in retrospect a stupid test?
    cy.get('button[id=editDynamic]').click();
    cy.contains('null').should('not.exist');
  });

it('adds dynamic property', function(){
    cy.get('button[id=editDynamic]').click();
    cy.get('input[id=addDynPropInput]').type('Mystery Property 1');
    cy.get('input[id=addDynPropInput2]').type('Glows under fluorescent light');
    cy.get('input[id=addDynPropBtn]').click();
    cy.contains('Action results');
    cy.get('a').contains('Return to encounter').click();
    cy.url().should('match', /encounter.jsp/);
    cy.contains(/Mystery_Property_1:\s*Glows under fluorescent light/);
  });

it('adds dynamic property and edits existing dynamic property', function(){
    cy.get('button[id=editDynamic]').click();
    cy.get('input[id=addDynPropInput]').type('Mystery Property 1');
    cy.get('input[id=addDynPropInput2]').type('Glows under fluorescent light');
    cy.get('input[id=addDynPropBtn]').click();
    cy.contains('Action results');
    cy.get('a').contains('Return to encounter').click();
    cy.url().should('match', /encounter.jsp/);
    cy.contains(/Mystery_Property_1:\s*Glows under fluorescent light/);
    cy.get('button[id=editDynamic]').click();
    cy.get('input[id=dynInput]').type('Giggles when you tickle it{enter}'); //TODO I think that this is another form nightmare
    cy.url().should('match',/EncounterSetDynamicProperty/);
    cy.contains('Action results');
    cy.get('a').contains('Return to encounter').click();
    cy.url().should('match', /encounter.jsp/);
    cy.contains('Giggles when you tickle it').should('exist');
  });

it('adds biological sample', function(){
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

it('edits date', function(){
    cy.get('button[id=editDate]').click();
    cy.get('input[id=datepickerField]').type('2018-12-21 05:00');
    cy.get('input[id=addResetDate]').click({force: true});
    cy.get('button[id=closeEditDate]').click();
    cy.contains('2018-12-21 05:00');
    //TODO I don't understand why this test fails; it shouldn't
  });
});

describe('Wildbook instance encounter page no delete after each', function() {
  beforeEach(()=>{
    cy.login();
    cy.createAndNavigateToEncounterWildbookGeneric();
  });

it('adds image to encounter', function(){
    cy.uploadFile('#file-chooser','fluke_manip.jpg')
    // cy.get('input[id=file-chooser]').click();
    // //TODO do things
    // cy.get('input[id=upload-button]').click();
    // cy.contains('Upload complete. Refresh page to see new image.');
  });

it('creates and then deletes encounter', function(){
      cy.deleteEncounterGeneric();
      cy.url().should('match',/EncounterDelete/);
      cy.contains('I have removed encounter');
      cy.go('back');
      cy.contains('There is no corresponding encounter number in the database');
    });

it('adds and removes adoption', function(){
      cy.get('a').contains('Add adoption').click({timeout: 60000});
      cy.get('p').contains('I could not find the adoption null').should('not.exist');
      //ATTN this test fails currently because there's a bug in wildbook
      //TODO move out of Wildbook instance encounter page no delete after each after it starts passing
    });
});
