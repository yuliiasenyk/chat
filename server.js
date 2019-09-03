//will be needed for socket.io
const PORT = process.env.PORT || 3000;
const logger = require('./config/winston');
const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
})

module.exports = http;
