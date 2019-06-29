const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Sale = require('../../models/sale');

router.get('/', (req, res, next) => {
  Sale.find()
  .exec()
  .then(docs => {
    console.log(docs);
    res.status(200).json(docs);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({
      error: err
    });
  });
});

router.post('/', (req, res, next) => {
  const sale = new Sale({
    _id: new mongoose.Types.ObjectId(),
    link: req.body.link,
    start: Date('now'),
    end: req.body.end,
    description: req.body.description
  });
  sale.save()
  .then(doc => {
    console.log(doc);
    res.status(201).json({
      createdSale: doc
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
