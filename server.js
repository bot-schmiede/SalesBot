const http = require('http');
const api = require('./api/api');

const port = process.env.PORT || 1337;

const server = http.createServer(api);

server.listen(port);
