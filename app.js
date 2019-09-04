const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const pug = require('pug');
const Message = require('./models/message');
const session = require('express-session');
const errorHandler = require('./errorHandler');
const logger = require('./config/winston');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const async = require("async");
const config = require('./config');

// const socket = require('./socket')
// const sessionInit = require('./session')

app.use(session(config.get('session')));

app.use(initSession);

io.on('connection', InitSocketConnection);

// io.on('connection', (socket, msg, data) => {
//     socket.on('chat message', async.waterfall([
//         createMessage (msg),
//         emitMessage (data),
//         ]))
// })

app.set('view engine', 'pug');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev',{ stream: logger.stream }));

app.use(routes);

app.use(errorHandler);

function initSession(req, res, next) {
    if (req.session && req.session.user) {
        currentUser = req.session.user;
        currentRoom = req.session.room;
        next();
    } else {
        next();
    }
}
function InitSocketConnection(socket) {
    socket.on('chat message', (msg) => {
        Message.create({
            text: msg,
            from: currentUser,
            timestamp: new Date(),
            room: currentRoom,
        }).then((data) => {
            if (data) {
                io.emit('chat message', msg, currentUser, currentRoom);
            }
        });
    });
}

http.listen(PORT, logger.verbose('app is on'));

module.exports =  app;
