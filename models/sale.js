const mongoose = require('mongoose');

const saleSchema = mongose.Schema({
  link: String
  start: Date,
  end: Date,
  description: String
});

module.exports = mongose.model('Sale', saleSchema);
