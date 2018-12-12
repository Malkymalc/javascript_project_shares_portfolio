const PubSub = require('../helpers/pubsub.js');

const StockFormView = function(container, stock){
  this.container = container;
  this.stock = stock;

};

StockFormView.prototype.render = function (stock) {
  const inputNo = document.createElement("input");
  inputNo.type = 'number';
  this.container.appendChild(inputNo);
  this.renderAddButton(inputNo, stock);
};

StockFormView.prototype.renderAddButton = function (inputNo, stock) {
  const addStockBtn = document.createElement('button');
  addStockBtn.textContent = 'Add Stock';
  this.container.appendChild(addStockBtn);

  addStockBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log('clicked button', inputNo.value);
    const data = {
      stockAmount: inputNo.value,
      share: stock
    };
    console.log(data);
    PubSub.publish('FormView:add-btn-clicked', data);
  });
};

module.exports = StockFormView;
