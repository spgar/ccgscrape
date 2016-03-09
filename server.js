var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scgscrape', function(req, res) {
    url = 'http://sales.starcitygames.com//deckdatabase/displaydeck.php?DeckID=99447';

    request(url, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            var $ = cheerio.load(html);

            var deckName, playerName, place;
            var json = { deckName: '', playerName: '', place: 0 };

            $('.deck_title').filter(function() {
                deckName = $(this).text();
            });

            $('.player_name').filter(function() {
                playerName = $(this).text();
            });

            $('.deck_played_placed').filter(function() {
                var data = $(this);
                var placeText = data.text().match(/\d(st|nd|rd|th)\sPlace/);
                if (placeText) {
                    place = parseInt(placeText[0][0]);
                }
            })

            json.deckName = deckName;
            json.playerName = playerName;
            json.place = place;

            console.log(json);
        }
    });
});

app.listen('8081');

console.log('Starting up on port 8081');

exports = module.exports = app;
