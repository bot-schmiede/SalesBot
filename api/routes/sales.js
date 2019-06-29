const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(404).json({
    message: 'not yet!'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'soon tm'
  });
});

module.exports = router;
