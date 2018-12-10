const PubSub = require('../helpers/pubsub.js');
const ListItemView = require('./list_item_view.js');
const ChartHelper = require('../helpers/chart_helper.js')
const LineChart = require('./lineChart.js');

const TempView= function (container) {
  this.container = container;
};

TempView.prototype.bindEvents = function () {
  console.log('prepubsub');
  PubSub.subscribe('Stocks:historic-data-loaded', (event) => {
    this.renderLineChart(event.detail)
  })
};

TempView.prototype.renderLineChart = function (shares) {
  this.container.innerHTML = '';
  const dataForChart = shares.map(stock => stock.close);
  console.log(shares);
  const chartContainer = document.createElement('div');
  chartContainer.className ='line-chart';
  const lineChart = new LineChart( 'Stock value chart','apple', dataForChart, this.container);
  this.container.appendChild(chartContainer);
};

module.exports = TempView;
