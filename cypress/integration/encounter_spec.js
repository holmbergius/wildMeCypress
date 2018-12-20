describe('Wildbook instance encounter page', function() {
  beforeEach(()=>{
    //TODO login is broken!
    cy.login();
    cy.createAndNavigateToEncounterWildbookGeneric();
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
    cy.get('#selectCode').select('1', {force: true}); //TODO disable for flukebook specific
    // cy.get('#selectCode').select('Study Site 1', {force: true}); //TODO enable for flukebook specific
    cy.get('input[id=setLocationBtn]').click();
    cy.get('input[id=depthInput]').type('1');
    cy.get('input[id=AddDepth]').click();
    cy.get('input[id=lat]').type('45.634268');
    cy.get('input[id=longitude]').type('-122.665984');
    cy.get('input[id=setGPSbutton]').click({force: true});
    cy.get('button[id=closeEditLocation]').click();
  });
it.skip('can set new or existing individual ID', function(){
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=individualAddEncounterInput]').type('frumpy', {force: true}); //TODO add real whale name here
    cy.get('#matchType').select('Pattern match', {force: true});
    cy.get('input[id=Add]').click({force: true});
    cy.get('button[id=closeEditIdentity]').click();
    cy.contains('frumpy');
  });
it.skip('add alternate id', function(){
    //TODO why not clickable
    cy.createAndNavigateToEncounterWildbookGeneric();
    cy.get('button[id=editIdentity]').click();
    cy.get('input[id=alternateid]').type('frumpy123');
    cy.get('input[id=setAltIDbtn]').click();
  });
it.skip('creates occurrence', function(){
     cy.createAndNavigateToEncounterWildbookGeneric();
     cy.get('button[id=editIdentity]').click();
     cy.get('input[id=createOccurrenceInput]').type('testOccurrence' + Math.random().toString());
     cy.get('input[id=createOccur]').click();
     //TODO add assert
   });
it.skip('adds to occurrence', function(){
     cy.get('button[id=editIdentity]').click();
     cy.get('input[id=add2OccurrenceInput]').type('knownOccurrence123'); //TODO do I have to find a real occurrence that I can mess with?
     cy.get('input[id=addOccurrence]').click();
     cy.get('button[id=closeEditIdentity]').click();
   });
it.skip('edits contact info', function(){
    cy.get('button[id=editContactBtn]').click();
    cy.contains('Submitter').should('not.exist');
    //TODO a known bug: this is auto-failing because currently edit contact button doens't do anything
  });

  it.skip('assign to user dropdown should not contain null', function(){
    cy.get('button[id=editMeta]').click();
    cy.get('#submitterSelect').contains('null').should('not.exist');
    //TODO a known bug in wildbook
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

it('creates and then deletes encounter', function(){
    cy.createAndNavigateToEncounterWildbookGeneric();
    cy.get('input[id=editMeta]').click();
    cy.get('input[id=deleteButton]').click();
    Cypress.on('window:confirm', (err, runnable) => {
      // return true; //TODO necessary? TODO I suspect this may not work
    });
    cy.contains('I have removed encounter');
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
it.skip('adds biological sample', function(){
    cy.get('a[class=addBioSample]').click(); //TODO ?
  });


});
