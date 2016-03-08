var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
});

app.listen('8081');

console.log('Starting up on port 8081');

exports = module.exports = app;
