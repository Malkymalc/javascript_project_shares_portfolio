const Stocks = require('./models/stocks.js');
const PortfolioListView = require('./views/portfolio_list_view.js');
const StockListView = require('./views/stock_list_view.js');
const ShowStockDetailView = require('./views/show_stock_detail_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const stocksPortfolio = new Stocks('http://localhost:3000/api/portfolio/');
  stocksPortfolio.getPortfolioData();
  stocksPortfolio.getStocksForPortfolio();
  stocksPortfolio.bindEvents();

  // const stocksShares = new Stocks('http://localhost:300/api/stocks/');
  // stocksPortfolio.bindEvents();
  // stocksShares.bindEvents();

  const appContainer = document.querySelector('.app-container');

  const portfolioListView = new PortfolioListView(appContainer);
  portfolioListView.bindEvents();

  const stockView = new StockListView(appContainer);
  stockView.bindEvents();

  // const portfolioLink = document.querySelector('#portfolio_link');
  // portfolioLink.addEventListener('click', (event) => {
  //   event.preventDefault();
  //   stocksPortfolio.getStocksForPortfolio();
  //   // render triggered by sub callback in bindEvents();
  // });
  //
  // const stocksLink = document.querySelector('#stocks_link');
  // portfolioLink.addEventListener('click', (event) => {
  //   event.preventDefault();
  //   stocksPortfolio.getStocksForPortfolio();
  //   // render not triggered by sub callback in bindEvents(), so...
  //   stockListView.render();
  //   });

  const showStockDetailView = new ShowStockDetailView(appContainer);
  showStockDetailView.bindEvents();
});
