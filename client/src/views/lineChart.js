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
      // {
      //   name: "stocks",
      //   color: "#73b7ff",
      //   data: [data]
      // },
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
        pointStart: Date.UTC(2018, 12, 10),
        pointInterval: 3

      }
    }
  });

};

module.exports = LineChart;
