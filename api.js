const express = require('express');
const api = express();


api.use((req, res, next) => {
  res.status(200).json({
    message: 'it works'
  });
});


// api.get('/', function (req, res) {
//   res.send('Hello World')
// })






module.exports = api;
