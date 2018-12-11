const Highcharts = require('highcharts');

const LineChart = function(title, name, data, container) {

  const chart = new Highcharts.Chart({
    chart: {
      renderTo: container
    },
    title: {
      text: title
    },
    series: [
      {
        name: name,
        color: "#ffac33",
        data: data
      }
    ],
    yAxis: {
      title: {
        text:  'stock values'
      }
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart      : Date.UTC(2018, 0, 0),
        pointInterval   : 24 * 3600 * 1000*30
      }
    },
    xAxis      : {
      min:Date.UTC(2018, 0, 0),
      max:Date.UTC(2018, 11, 1),
      allowDecimals: false,
      type           : 'datetime',
      tickInterval   : 24 * 3600 * 1000*30
    }
  });

};

module.exports = LineChart;
