const ChartHelper = function(stocks) {
  const stockData = []; //empty array
  //loop over countries and push to data (symbol and open ) and pop. to array
  for(stock of stocks) {
    stockData.push({
      name: stock.symbol,
      y: (stock.latestPrice * stock.amount)
    });
  }

  return stockData;
}

module.exports = ChartHelper;
