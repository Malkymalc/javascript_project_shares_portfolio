const PubSub = require('../helpers/pubsub.js');

const StockFormView = function (container, stock) {
  this.container = container;
  this.symbol = stock.symbol;
  this.stock = stock;
};

StockFormView.prototype.renderForm= function () {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';

  const deleteBtn = document.createElement("BUTTON");
  const t = document.createTextNode(`Remove all stocks ${this.symbol} from your fortfolio`);
  deleteBtn.appendChild(t);

  deleteBtn.addEventListener('click', (event) => {
    PubSub.publish('StockFormView:share-delete', this.stock );
    console.log(this.stock);
  });

  this.container.appendChild(deleteBtn);





};

module.exports = StockFormView;
