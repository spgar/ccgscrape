var expect  = require('chai').expect;
var bluebird = require('bluebird');
var jsonfile = require('jsonfile');
var scraper = bluebird.promisifyAll(require('../scraper'));

describe('Deck Scraper', function() {
    describe('Add to deck', function() {
        it('adds a single card to the maindeck', function() {
            var deck = [];
            scraper.addCard(deck, '1 Underground Sea', false);
            expect(deck.length).to.equal(1);
            expect(deck).to.deep.equal([{name: 'Underground Sea', main: 1, side: 0}]);
        });
        it('adds a single card to the sideboard', function() {
            var deck = [];
            scraper.addCard(deck, '1 Underground Sea', true);
            expect(deck.length).to.equal(1);
            expect(deck).to.deep.equal([{name: 'Underground Sea', main: 0, side: 1}]);
        });
        it('adds a card to the maindeck and sideboard', function() {
            var deck = [];
            scraper.addCard(deck, '1 Underground Sea', false);
            scraper.addCard(deck, '1 Underground Sea', true);
            expect(deck.length).to.equal(1);
            expect(deck).to.deep.equal([{name: 'Underground Sea', main: 1, side: 1}]);
        });
        it('adds multiple cards to the deck', function() {
            var deck = [];
            scraper.addCard(deck, '4 Underground Sea', false);
            scraper.addCard(deck, '4 Polluted Delta', false);
            expect(deck.length).to.equal(2);
            expect(deck).to.contain({name: 'Underground Sea', main: 4, side: 0});
            expect(deck).to.contain({name: 'Polluted Delta', main: 4, side: 0});
        });
        it('does not create duplicate cards in the deck', function() {
            var deck = [];
            scraper.addCard(deck, '1 Underground Sea', false);
            expect(function() {
                scraper.addCard(deck, '1 Underground Sea', false);
            }).to.throw('Trying to add the same card twice: Underground Sea');
        });
    });

    describe('Scrape Hearthpwn deck', function() {
        it('scrapes a complete deck - Druid', function(done) {
            scraper.scrapeHearthpwnDeckAsync(249225)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/hearthpwn_249225.json');
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });
        it('scrapes a complete deck - Hunter', function(done) {
            scraper.scrapeHearthpwnDeckAsync(400374)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/hearthpwn_400374.json');
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });
        it('scrapes a complete deck - Mage', function(done) {
            scraper.scrapeHearthpwnDeckAsync(134111)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/hearthpwn_134111.json');
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });
        it('scrapes a complete deck - Paladin', function(done) {
            scraper.scrapeHearthpwnDeckAsync(309848)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/hearthpwn_309848.json');
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });
        it('scrapes a complete deck - Priest', function(done) {
            scraper.scrapeHearthpwnDeckAsync(308694)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/hearthpwn_308694.json');
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });
        it('scrapes a complete deck - Rogue', function(done) {
            scraper.scrapeHearthpwnDeckAsync(307)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/hearthpwn_307.json');
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });
        it('scrapes a complete deck - Shaman', function(done) {
            scraper.scrapeHearthpwnDeckAsync(308008)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/hearthpwn_308008.json');
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });
        it('scrapes a complete deck - Warlock', function(done) {
            scraper.scrapeHearthpwnDeckAsync(239855)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/hearthpwn_239855.json');
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });
        it('scrapes a complete deck - Warrior', function(done) {
            scraper.scrapeHearthpwnDeckAsync(386427)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/hearthpwn_386427.json');
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });
    });

    describe('Scrape SCG deck', function() {
        it('scrapes a complete deck', function(done) {
            scraper.scrapeSCGDeckAsync(97366)
            .then(function(deckJSON) {
                var testJSON = jsonfile.readFileSync('./test/data/scg_97366.json');
                testJSON.date = new Date(testJSON.date); // What's the better way to do this?
                expect(deckJSON).to.deep.equal(testJSON);
                done();
            });
        });

        it('throws error on invalid deck ID', function(done) {
            scraper.scrapeSCGDeckAsync(0)
            .catch(function(error) {
                expect(error.cause).to.deep.equal(new Error('Invalid DeckID'));
                done();
            });
        });
    });

    describe('Scrape SCG deck IDs', function() {
        it('scrapes deck IDs from a date range', function(done) {
            var startDate = new Date(2015, 11, 17);
            var endDate = new Date(2015, 11, 20);
            scraper.scrapeSCGDeckIDsAsync(startDate, endDate)
            .then(function(deckIDsJSON) {
                expect(deckIDsJSON.deckIDs).to.deep.equal([
                    '96440',
                    '96429',
                    '96406',
                    '96422',
                    '96434',
                    '96442',
                    '96409',
                    '96446'
                ]);
                done();
            });
        });
    });
});