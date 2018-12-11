const PubSub = require('../helpers/pubsub.js');

const StockFormView = function(container, symbol){
  this.container = container;
  this.symbol = symbol;

};

StockFormView.prototype.render = function () {
  const inputNo = document.createElement("input");
  inputNo.type = 'number';
  this.container.appendChild(inputNo);

  const addStock = document.createElement('button');
  addStock.textContent = 'Add Stock';
  this.container.appendChild(addStock);

  addStock.addEventListener('click', (event) => {
    console.log('clicked button', inputNo.value);
    const data = {
      symbol: this.symbol,
      amount: inputNo.value
    };

    PubSub.publish('StockFormView:add-stock', data);
  });
};

module.exports = StockFormView;
