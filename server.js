var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

function addCard(cards, name, quantity, isSideboard) {
    var findObj = cards.filter(function(obj) {
        return obj.name === name;
    })[0];

    if (findObj) {
        // Check to see if this has already been set.
        if ((isSideboard && findObj.side !== 0) || (!isSideboard && findObj.main !== 0)) {
            throw new Error('Trying to add the same card twice: ' + name);
        }

        // Otherwise we can set the quantity.
        if (isSideboard) {
            findObj.side = quantity;
        } else {
            findObj.main = quantity;
        }
    } else {
        var card = {};
        card.main = quantity;
        card.side = 0;
        card.name = name;
        cards.push(card);
    }
}

app.get('/scgscrape', function(req, res) {
    url = 'http://sales.starcitygames.com//deckdatabase/displaydeck.php?DeckID=99447';

    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            var $ = cheerio.load(html);

            var deckName, playerName, place;
            var cards = [];
            var json = { deckName: '', playerName: '', place: 0, cards: [] };

            $('.deck_title').filter(function() {
                deckName = $(this).text();
            });

            $('.player_name').filter(function() {
                playerName = $(this).text();
            });

            $('.deck_played_placed').filter(function() {
                var data = $(this);
                var placeText = data.text().match(/(\d)(st|nd|rd|th)\sPlace/);
                if (placeText) {
                    place = parseInt(placeText[1]);
                }
            });

            $('.cards_col1 li').each(function(i, e) {
                var data = $(this);
                var cardText = data.text().match(/(\d+)\s(.+)$/);
                if (cardText) {
                    addCard(cards, cardText[2], Number(cardText[1]), false);
                }
            });

            $('.cards_col2 > ul li').each(function(i, e) {
                var data = $(this);
                var cardText = data.text().match(/(\d+)\s(.+)$/);
                if (cardText) {
                    addCard(cards, cardText[2], Number(cardText[1]), false);
                }
            });

            $('.deck_sideboard li').each(function(i, e) {
                var data = $(this);
                var cardText = data.text().match(/(\d+)\s(.+)$/);
                if (cardText) {
                    addCard(cards, cardText[2], Number(cardText[1]), true);
                }
            });

            json.deckName = deckName;
            json.playerName = playerName;
            json.place = place;
            json.cards = cards;

            console.log(json);
        }
    });
});

app.listen('8081');

console.log('Starting up on port 8081');

exports = module.exports = app;
