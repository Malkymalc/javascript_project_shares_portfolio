const PubSub = require('../helpers/pubsub.js');
const StockFormView = require('./stock_form_view.js');
const StockDetailView = require('./stock_detail_view.js');

const ShowStockDetailView = function (container, symbol) {
  this.container = container;
  this.symbol = symbol;
};

ShowStockDetailView.prototype.bindEvents = function () {
  PubSub.subscribe('Stock:stock-info-loaded', (event) => {
    this.render(event.detail);
    console.log(event.detail);
  });

};

ShowStockDetailView.prototype.render = function (stock) {
  this.container.innerHTML = '';

  const stockFormView = new StockFormView(this.container, stock);
  stockFormView.render(stock);


  const stockDetailView = new StockDetailView(this.container);
  stockDetailView.render(stock);
};

module.exports = ShowStockDetailView;
