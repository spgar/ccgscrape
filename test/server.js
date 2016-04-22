var expect  = require('chai').expect;
var bluebird = require('bluebird');
var request = bluebird.promisifyAll(require('request'), {multiArgs:true});

describe('Deck Scraper Server', function() {
    describe('Scrape SCG deck', function() {
        it('returns JSON of an SCG deck', function(done) {
            var url = "http://localhost:8081/scgscrapedeck/?id=97366";
            request.getAsync(url)
            .spread(function(response, html) {
                expect(response.statusCode).to.equal(200);
                expect(html).to.equal('{"deckName":"U/B Tezzeret","playerName":"Will Hutchins","date":"2015-12-27T05:00:00.000Z","place":6,"cards":[{"name":"Baleful Strix","main":4,"side":0},{"name":"Phyrexian Revoker","main":1,"side":0},{"name":"Trinket Mage","main":1,"side":0},{"name":"Ashiok, Nightmare Weaver","main":2,"side":0},{"name":"Jace, the Mind Sculptor","main":2,"side":0},{"name":"Tezzeret, Agent of Bolas","main":4,"side":0},{"name":"Seat of the Synod","main":1,"side":0},{"name":"Island","main":3,"side":0},{"name":"Swamp","main":1,"side":0},{"name":"Ancient Tomb","main":3,"side":0},{"name":"City of Traitors","main":4,"side":0},{"name":"Darkslick Shores","main":1,"side":0},{"name":"Darkwater Catacombs","main":1,"side":0},{"name":"Polluted Delta","main":4,"side":0},{"name":"Underground Sea","main":2,"side":0},{"name":"Academy Ruins","main":1,"side":0},{"name":"Urborg, Tomb of Yawgmoth","main":1,"side":0},{"name":"Chalice of the Void","main":4,"side":0},{"name":"Dimir Signet","main":1,"side":0},{"name":"Engineered Explosives","main":1,"side":2},{"name":"Ensnaring Bridge","main":2,"side":0},{"name":"Mox Diamond","main":2,"side":0},{"name":"Nihil Spellbomb","main":1,"side":0},{"name":"Sword of the Meek","main":1,"side":0},{"name":"Talisman of Dominance","main":1,"side":0},{"name":"Thopter Foundry","main":2,"side":0},{"name":"Force of Will","main":3,"side":0},{"name":"Thirst For Knowledge","main":1,"side":0},{"name":"Toxic Deluge","main":2,"side":0},{"name":"Transmute Artifact","main":3,"side":0},{"name":"Cursed Totem","main":0,"side":1},{"name":"Grafdigger\'s Cage","main":0,"side":1},{"name":"Pithing Needle","main":0,"side":1},{"name":"Staff of Nin","main":0,"side":1},{"name":"Trinisphere","main":0,"side":1},{"name":"Tsabo\'s Web","main":0,"side":1},{"name":"Guardian Beast","main":0,"side":1},{"name":"Notion Thief","main":0,"side":1},{"name":"Dread of Night","main":0,"side":1},{"name":"Flusterstorm","main":0,"side":2},{"name":"Surgical Extraction","main":0,"side":1},{"name":"Massacre","main":0,"side":1}]}');
                done();
            });
        });

        it('returns JSON of SCG deck IDs from a date range', function(done) {
            var url = "http://localhost:8081/scgscrapedeckids?startDate=12/17/2015&endDate=12/20/2015";
            request.getAsync(url)
            .spread(function(response, html) {
                expect(response.statusCode).to.equal(200);
                expect(html).to.equal('{"deckIDs":["96440","96429","96406","96422","96434","96442","96409","96446"]}');
                done();
            });
        });
    });
});