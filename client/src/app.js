const Stocks = require('./models/stocks.js');
const PortfolioListView = require('./views/portfolio_list_view.js');
const StockListView = require('./views/stock_list_view.js');
const TempView = require('./views/temp_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const stocksPortfolio = new Stocks('http://localhost:3000/api/portfolio/');
  stocksPortfolio.getPortfolioData();
  stocksPortfolio.getStocksForPortfolio();
  stocksPortfolio.historicData();

  const stockList = document.querySelector('.stocklist');
  const portfolioListView = new PortfolioListView(stockList);
  portfolioListView.bindEvents();

  const stockView = new StockListView(stockList);
  stockView.bindEvents();


  const stockList2 = document.querySelector('.stocklist2');
  const tempView = new TempView(stockList2);
  tempView.bindEvents();
});
