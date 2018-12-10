const PubSub = require('../helpers/pubsub.js');
const ListItemView = require('./list_item_view.js');
const ChartHelper = require('../helpers/chart_helper.js')
const PieChart = require('./pieChart.js');

const PortfolioListView= function (container) {
  this.container = container;
};

PortfolioListView.prototype.bindEvents = function () {
  PubSub.subscribe('Stocks:portfolio-data-loaded', (event) => {
    this.render(event.detail);
    this.renderPieChart(event.detail)
  })
};

PortfolioListView.prototype.render = function (shares) {
  this.container.innerHTML = '';
  const listItemView = new ListItemView(this.container);
  Array.from(shares).forEach((banana) => listItemView.renderPortfolio(banana));
};

PortfolioListView.prototype.renderPieChart = function (shares) {
  const dataForChart = new ChartHelper(shares);
  const chartContainer = document.createElement('div');
  chartContainer.className ='pie-chart';
  const pieChart = new PieChart('Stock value chart', dataForChart, chartContainer);
  this.container.appendChild(chartContainer);
};

module.exports = PortfolioListView;
