const LineChart = function(title, data, categories) {

  let container = document.getElementById("lineChart");

  const chart = new Highcharts.Chart({
    chart: {
      renderTo: container
    },
    title: {
      text: title
    },
    series: [
      {
        name: "stocks",
        color: "#73b7ff",
        data: [data]
      },
      {
        name: "Stock Data",
        color: "#ffac33",
        data: data
      }
    ],
    xAxis: {
      categories: categories
    },
  });

};
