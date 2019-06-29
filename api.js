const express = require('express');
const api = express();
const morgan = require('morgan');

const saleRoutes = require('./api/routes/sales');

api.use(morgan('dev'));

api.use('/sales', saleRoutes);

api.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

api.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

module.exports = api;
