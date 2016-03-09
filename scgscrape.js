var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

// Adds a card to cards. Card is raw text like this: '3 Underground Sea'
function addCard(cards, text, isSideboard) {
    var cardText = text.match(/(\d+)\s(.+)$/);
    if (!cardText) {
        throw new Error('Failed to parse card: ' + text);
    }

    var quantity = Number(cardText[1]);
    var name = cardText[2];

    // Two cases:
    // - Updating a card that has already been added (exists in main and sideboard)
    // - Adding a new card to cards
    var findObj = cards.filter(function(obj) {
        return obj.name === name;
    })[0];
    if (findObj) {
        if ((isSideboard && findObj.side !== 0) || (!isSideboard && findObj.main !== 0)) {
            throw new Error('Trying to add the same card twice: ' + name);
        }

        if (isSideboard) {
            findObj.side = quantity;
        } else {
            findObj.main = quantity;
        }
    } else {
        var card = {};
        if (isSideboard) {
            card.main = 0;
            card.side = quantity;
        } else {
            card.main = quantity;
            card.side = 0;
        }
        card.name = name;
        cards.push(card);
    }
}
// Takes in a SCG URL via ?scgURL and returns a JSON representation of the deck.
app.get('/scgscrape', function(req, res) {
    request(req.query.scgURL, function(error, response, html) {
        if (error) {
            throw error;
        }
        
        var $ = cheerio.load(html);

        var deckName, playerName, place;
        var cards = [];
        var json = { deckName: '', playerName: '', place: 0, cards: [] };

        // Extract the deck title
        $('.deck_title').filter(function() {
            deckName = $(this).text();
        });

        // Extract the player's name
        $('.player_name').filter(function() {
            playerName = $(this).text();
        });

        // Extract the deck place
        $('.deck_played_placed').filter(function() {
            var data = $(this);
            var placeText = data.text().match(/(\d)(st|nd|rd|th)\sPlace/);
            if (placeText) {
                place = Number(placeText[1]);
            } else {
                throw new Error('Failed to extract deck place.');
            }
        });

        // Add cards to the main deck
        $('.cards_col1 li').each(function(i, e) {
            addCard(cards, $(this).text(), false);
        });
        $('.cards_col2 > ul li').each(function(i, e) {
            addCard(cards, $(this).text(), false);
        });

        // And the sideboard
        $('.deck_sideboard li').each(function(i, e) {
            addCard(cards, $(this).text(), true);
        });

        // Add everything to the json and then return
        json.deckName = deckName;
        json.playerName = playerName;
        json.place = place;
        json.cards = cards;

        console.log(json);
        res.json(json);
    });
});

app.listen('8081');

console.log('Starting up on port 8081');

exports = module.exports = app;
