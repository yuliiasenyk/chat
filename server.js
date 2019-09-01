//will be needed for socket.io

const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
});

module.exports = http;
