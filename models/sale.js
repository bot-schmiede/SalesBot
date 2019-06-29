const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  link: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true,
    validate: [dateValidator, 'End Date must be more than Start Date']
  },
  end: {
    type: Date,
    required: true,
    validate: [futureValidator, 'Date must be less than End Date']
  },
  description: {
    type: String,
    required: true
  },
});

function dateValidator(value) {
  return this.end >= value;
}

function futureValidator(value) {
  let date = new Date();
  date.setDate(date.getDate() - 1)
  return date <= value;
}

module.exports = mongoose.model('Sale', saleSchema);
