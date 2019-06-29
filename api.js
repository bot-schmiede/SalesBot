const express = require('express');
const api = express();

const saleRoutes = require('./api/routes/sales');

api.use('/sales', saleRoutes);

module.exports = api;
