var expect  = require('chai').expect;
var scraper = require('../scraper');

describe('Deck Scraper', function() {
    describe('Add to deck', function() {
        it('adds a single card to the maindeck', function() {
            var cards = [];
            scraper.addCard(cards, '1 Underground Sea', false);
            expect(cards.length).to.equal(1);
            expect(cards).to.deep.equal([{name: 'Underground Sea', main: 1, side: 0}]);
        });
        it('adds a single card to the sideboard', function() {
            var cards = [];
            scraper.addCard(cards, '1 Underground Sea', true);
            expect(cards.length).to.equal(1);
            expect(cards).to.deep.equal([{name: 'Underground Sea', main: 0, side: 1}]);
        });
        it('does not create duplicate cards in the deck', function() {
            var cards = [];
            scraper.addCard(cards, '1 Underground Sea', false);
            expect(function() {
                scraper.addCard(cards, '1 Underground Sea', false);
            }).to.throw('Trying to add the same card twice: Underground Sea');
        });
        it('adds cards to maindeck and sideboard', function() {
            var cards = [];
            scraper.addCard(cards, '1 Underground Sea', false);
            scraper.addCard(cards, '1 Underground Sea', true);
            expect(cards.length).to.equal(1);
            expect(cards).to.deep.equal([{name: 'Underground Sea', main: 1, side: 1}]);
        });
    });
});