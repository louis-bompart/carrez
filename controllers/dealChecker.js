var leboncoin = require('./adScraper.js');
var agentScraper = require('./agentScraper.js');

var deal;
var price;

function process(url,callback) {
  leboncoin.processURL(url, function (data) {
    agentScraper.processURL(data, function (a,b) {
      callback(a,b);
      deal=a;
      price=b;
    });
  });
}

module.exports = {deal,price,process};
