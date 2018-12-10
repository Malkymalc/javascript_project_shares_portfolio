const PubSub = require('../helpers/pubsub.js')
const ListItemView = require('./list_item_view.js');

const StockListView= function (container) {
  this.container = container;
};

StockListView.prototype.bindEvents = function () {
  PubSub.subscribe('Stocks:stocks-data-loaded', (event) => {
    const chart = event.detail;
    //this.render(chart);
  })
};

//call Listitemview to display all stock data from api
StockListView.prototype.render = function (shares) {
  this.container.innerHTML = '';
  const listItemView = new ListItemView(this.container);
  Array.from(shares).forEach((stocks) => listItemView.renderStockList(stocks));
};

module.exports = StockListView;
