const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Sale = require('../../models/sale');

router.get('/', (req, res, next) => {
  Sale.find()
  .select('link start end description')
  .exec()
  .then(docs => {
    res.status(200).json(response);
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
    end: req.body.end,
    description: req.body.description
  });
  sale.save()
  .then(doc => {
    res.status(201).json({
      createdSale: {
        link: doc.link,
        end: doc.end,
        description: doc.description
      }
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
