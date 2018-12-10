const PubSub = require('../helpers/pubsub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Stocks = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
  this.stockData = [];
  this.portfolioData = [];
};

Stocks.prototype.getPortfolioData = function () {
  this.request.get()
  .then((shares) => {
    PubSub.publish('Stocks:portfolio-data-loaded', shares);
    this.portfolioData = shares;
  })
  .catch(console.error);
};

Stocks.prototype.getStocksForPortfolio = function () {
  const extraRequest = new RequestHelper('https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Health%20Care');
  extraRequest.get()
  .then((stocks) => {
    PubSub.publish('Stocks:stocks-data-loaded', stocks);
    this.stockData = stocks;
    const portfolioSymbols = this.portfolioData.map(share => share.symbol);
    this.stockData = this.stockData.filter(share => portfolioSymbols.includes(share.symbol));
    this.updatePortfolio();
  })
  .catch(console.error);
};

Stocks.prototype.updatePortfolio = function () {
  this.stockData.forEach((share) => {
    const shareID = this.findID(share);
    this.request.update(shareID, share)
    .then((shares) => {
      PubSub.publish('Stocks:portfolio-data-loaded', shares);
    })
    .catch(console.error);
  })
};

Stocks.prototype.findID = function (share) {
  const stock = this.portfolioData.filter(stock => stock.symbol === share.symbol);
  const shareID = stock[0]._id;
  return shareID;
};

Stocks.prototype.historicData = function () {
  const testRequest = new RequestHelper('https://api.iextrading.com/1.0/stock/epix/chart/1y');
  testRequest.get()
  .then((historicData) => {
    PubSub.publish('Stocks:historic-data-loaded', historicData);
  })
  .catch(console.error);
}

module.exports = Stocks;
