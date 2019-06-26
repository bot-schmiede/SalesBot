const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  link: {type: String, required: true},
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  description: {type: String, required: true},
});

module.exports = mongoose.model('Sale', saleSchema);
