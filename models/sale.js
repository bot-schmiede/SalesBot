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
    validate: [futureValidator, 'Date must be less than End Date']
  },
  description: {
    type: String,
    required: true
  },
});

function futureValidator(value) {
  let date = new Date();
  date.setDate(date.getDate() - 1)
  return date <= value;
}

module.exports = mongoose.model('Sale', saleSchema);
