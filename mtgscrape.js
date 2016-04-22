var express = require('express');
var bluebird = require('bluebird');
var scraper = bluebird.promisifyAll(require('./scraper'));
var app     = express();

// Takes in a deckID and returns a JSON representation of the deck.
app.get('/scgscrapedeck', function(req, res) {
    scraper.scrapeSCGDeckAsync(req.query.id)
    .then(function(deckJSON) {
        console.log(deckJSON);
        res.json(deckJSON);
    });
});

function dateFromString(str) {
    var dateStr = str.match(/(\d+)\/(\d+)\/(\d\d\d\d)/);
    return new Date(dateStr[3], dateStr[1] - 1, dateStr[2]);
}

// Takes in a date range and scrapes a list of deckIDs within that range
app.get('/scgscrapedeckids', function(req, res) {
    var startDate = dateFromString(req.query.startDate);
    var endDate = dateFromString(req.query.endDate);
    scraper.scrapeSCGDeckIDsAsync(startDate, endDate)
    .then(function(deckIDsJSON) {
        console.log(deckIDsJSON);
        res.json(deckIDsJSON);
    });
});

app.listen('8081');

console.log('Starting up on port 8081');

exports = module.exports = app;
