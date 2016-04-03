var expect  = require('chai').expect;
var scraper = require('../scraper');

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
});