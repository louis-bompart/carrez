'use strict';

var cheerio = require('cheerio');
var request = require('request');
var JSON3 = require('json3');
var fs = require('fs');
var goodDeal;
var surfacePrice = 0.0;

function processURL(input, callback) {
  var htmlAdress = 'https://www.meilleursagents.com/prix-immobilier/' + input.city.replace(new RegExp('_','g'),'-') +'-'+ input.cp + '/#estimates'
  request(htmlAdress,function (err,resp,html) {
    doProcess(err,resp,html,callback,input);
  });
}

function doProcess(err,resp,html,callback,input) {
  var parsedHtml = cheerio.load(html);
  var selector = "";
  if(input.kind==='appartement') {
    selector = '#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median'
  }
  else {
    selector = '#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median'
  }
  var rawJson = parsedHtml(selector).text();
  surfacePrice = parseFloat(rawJson.replace(new RegExp('[ \u00a0, ,\n,€]', 'g'),''));
  var prix = parseFloat(input.prix);
  var surface = parseFloat(input.surface);
  if(prix>(surface*surfacePrice)) {
    goodDeal = true;
  }
  else {
    goodDeal = false;
  }
  callback(goodDeal,surfacePrice);
}

module.exports = {processURL, goodDeal, surfacePrice};
