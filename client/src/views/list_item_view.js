const PubSub = require('../helpers/pubsub.js');
const ShowStockDetailView = require('./show_stock_detail_view.js');

const ListItemView = function (container) {
  this.container = container;
};

ListItemView.prototype.renderPortfolio = function (share) {
  const shareContainer = document.createElement('div');
  shareContainer.className = 'share';

  const link = document.createElement('a');
  link.setAttribute("href", "");
  shareContainer.appendChild(link);

  const name = document.createElement('h3');
  name.className = 'share-name';
  name.textContent = share.companyName;
  link.appendChild(name);

  link.addEventListener('click', (event) => {
    event.preventDefault();
    const showStockDetailView = new ShowStockDetailView(this.container, share.symbol);
    PubSub.publish('ListItemView:stock-symbol', share.symbol);
    showStockDetailView.render(share);
    console.log('ajnd', share.symbol);
  });

  const symbol = document.createElement('p');
  symbol.className = 'share-symbol';
  symbol.textContent = share.symbol;
  shareContainer.appendChild(symbol);

  const latestPrice = document.createElement('p');
  latestPrice.className = 'share-latestPrice';
  latestPrice.textContent = `Latest price: $ ${share.latestPrice}`;
  shareContainer.appendChild(latestPrice);

  const priceChange = document.createElement('p');
  priceChange.className = 'share-price-change';
  priceChange.textContent = `Change: $ ${share.change}`;
  shareContainer.appendChild(priceChange);

  const amountOfShares = document.createElement('p');
  amountOfShares.className = 'share-amount';
  amountOfShares.textContent = `Holdings: ${share.amount}`;
  shareContainer.appendChild(amountOfShares);

  const totalValue = document.createElement('p');
  totalValue.className = 'total-value';
  totalValue.textContent = `Total value: $ ${share.amount * share.latestPrice}`;
  shareContainer.appendChild(totalValue);

  this.container.appendChild(shareContainer);
};

ListItemView.prototype.renderStockList = function (stocks) {

  const stockContainer = document.createElement('div');

  const link = document.createElement('a');
  link.setAttribute("href", "");
  stockContainer.appendChild(link);

  const company = document.createElement('h3');
  company.className = 'company';
  company.textContent = stocks.companyName;
  link.appendChild(name);

  stockContainer.className = 'stocks';
  const symbol = document.createElement('p');
  symbol.className = 'symbol';
  symbol.textContent = stocks.symbol;
  stockContainer.appendChild(symbol);

  this.container.appendChild(stockContainer);
}


module.exports = ListItemView;
