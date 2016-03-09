var express = require('express');
var scraper = require('./scraper');
var app     = express();

// Takes in a deckID and returns a JSON representation of the deck.
app.get('/scrapedeck', function(req, res) {
    deckJSON = scraper.scrapeDeck(req.query.deckID, function(deckJSON) {
        console.log(deckJSON);
        res.json(deckJSON);
    });
});

app.listen('8081');

console.log('Starting up on port 8081');

exports = module.exports = app;
