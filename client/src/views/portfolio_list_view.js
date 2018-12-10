const PubSub = require('../helpers/pubsub.js');
const ListItemView = require('./list_item_view.js');
const ChartHelper = require('../helpers/chart_helper.js')
const PieChart = require('./pieChart.js');

const PortfolioListView= function (container) {
  this.container = container;
  console.log("container", this.container);
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
  const dataForChart = ChartHelper(shares);
  const chartContainer = document.createElement('div');
  const pieChart = new PieChart('PieChart', dataForChart, chartContainer);
  this.container.appendChild(chartContainer);
};

module.exports = PortfolioListView;
