'use strict';

var cheerio = require('cheerio');
var request = require('request');
var JSON3 = require('json3');

function gotHTML(err, resp, html, callback) {
  if (err) {
    return console.error(err);
  }
  var parsedHtml = cheerio.load(html);
  var rawJson = parsedHtml('body script').first().text();
  rawJson = rawJson.substring(rawJson.indexOf('{'));
  rawJson = rawJson.replace(new RegExp('\n  ','g'),'\n  "');
  rawJson = rawJson.replace(new RegExp(' :','g'),'" :');
  var parsedJson = JSON3.parse(rawJson);
  generateJsonAdd(parsedJson,callback);
}

function generateJsonAdd(originJson,callback) {
  var ad = new realEstateAd();
  ad.surface = originJson.surface;
  ad.prix = originJson.prix
  ad.cp = originJson.cp;
  ad.city = originJson.city;
  ad.kind = originJson.type;
  callback(ad);
}

function realEstateAd() {
  this.surface = 0;
  this.cp = "";
  this.city = "";
  this.kind = "";
}

module.exports = {processURL};

function processURL(url, callback) {
  request(url,function (err,resp,html) {
    gotHTML(err,resp,html,callback);
  });
}
