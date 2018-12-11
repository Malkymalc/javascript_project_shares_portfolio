const PubSub = require('../helpers/pubsub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Stocks = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
  this.stockData = [];
  this.portfolioData = [];
};

Stocks.prototype.bindEvents = function () {
  PubSub.subscribe('ListItemView:link-clicked', (event) => {
    this.getMoreInfoOnStock(event.detail)
      .then((stock) => {
        PubSub.publish('Stock:stock-info-loaded', stock);
     })
     .catch(console.error);
  });

  PubSub.subscribe('StockFormView:share-delete', (event) => {
    this.deleteOne(event.detail)
      PubSub.publish('Stock:stock-info-loaded');
  });

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


Stocks.prototype.getMoreInfoOnStock = function (symbol) {
  const request = new RequestHelper(`https://api.iextrading.com/1.0/stock/${symbol}/company`);
  return request.get();
//  const newInfo = request.get();
  // const request2 = this.portfolioData.filter(share => share.symbol === symbol);
  // const amount = request2[0].amount;
  // console.log(amount);
  // const moreInfo = {
  //   ...newInfo,
  //   amount: request2[0].amount
  // };
  // console.log(moreInfo);
  // return moreInfo;
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

Stocks.prototype.deleteOne = function (share) {
  const deleteId = this.findID(share);
  console.log(deleteId);
  this.request.delete(deleteId);
};


module.exports = Stocks;
