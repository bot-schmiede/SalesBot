const express = require('express');
const api = express();
const morgan = require('morgan');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

//import routes
const saleRoutes = require('./api/routes/sales');

//conect to DB
mongoose.connect(
  'mongodb://' +
  process.env.USER + ':' +
  process.env.PASSWD +
  '@salesbot-shard-00-01-yyrbx.mongodb.net:27017/' +
  process.env.DB +
  '?ssl=true&replicaSet=SalesBot-shard-0&authSource=admin',
  {
    useNewUrlParser: true,
    dbName: process.env.DB,
  }
)
.then(() => {
  console.log('\napi connected to database\n')
}).catch(error => {
  console.log(error);
});
mongoose.Promise = global.Promise;

//apply middleware
api.use(morgan('dev'));
api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if(req.methode === 'OPTIONS') {
    res.header('Access-Controll-Allow-Methods', 'POST, GET');
    return res.status(200).json({});
  }
  next();
});

//use routes
api.use('/sales', saleRoutes);

//error handling
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
