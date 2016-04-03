var expect  = require('chai').expect;
var scraper = require('../scraper');

describe('Deck Scraper', function() {
    describe('Add to deck', function() {
        it('adds a single card to the deck', function() {
            var cards = [];
            scraper.addCard(cards, '1 Underground Sea', false);
            expect(cards.length).to.equal(1);
            expect(cards).to.deep.equal([{name: 'Underground Sea', main: 1, side: 0}]);
        });
    });
});