const express = require('express');
const api = express();
const morgan = require('morgan');

const saleRoutes = require('./api/routes/sales');

api.use(morgan('dev'));

api.use('/sales', saleRoutes);

module.exports = api;
