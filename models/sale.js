const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  link: {
    type: String,
    required: true
  },
  end: {
    type: Date,
    required: true,
    validate: [notInPastValidator, 'End date can not be in the past']
  },
  description: {
    type: String,
    required: true
  },
});

function notInPastValidator(value) {
  let date = new Date();
  date.setDate(date.getDate() - 1)
  return date <= value;
}

module.exports = mongoose.model('Sale', saleSchema);
