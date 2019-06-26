const mongoose = require('mongoose');
const Sale = require('../models/sale');

exports.get_all = (message) => {
  Sale.find()
  .exec()
  .then(docs => {
    message.channel.send(docs);
  })
  .catch(console.error)
}


exports.add_sale = (saleData, message) => {
  const sale = new Sale({
    _id: new mongoose.Types.ObjectId(),
    link: saleData.link,
    start: saleData.start,
    end: saleData.end,
    description: saleData.description
  });
  sale.save()
  .then(doc => {
    console.log(doc);
    message.channel.send('sale added');
  })
  .catch(err => {
    message.channel.send(err);
    console.error(err);
  });
}
