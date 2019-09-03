const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const pug = require('pug');
const session = require('express-session');
const errorHandler = require('./errorHandler');
const logger = require('./config/winston');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Message = require('./models/message');
const currentUser = "admin";
const currentRoom = 'yyy';

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.locals.user = currentUser;
app.use((req, res, next) => {
    res.locals.room = currentRoom;
    next();
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        Message.create({
            text: msg,
            from: currentUser,
            timestamp: new Date(),
            room: currentRoom,
        }).then((data) => {
            if (data) {
                socket.emit('chat message', msg, currentUser);
             }
        });
    });
});
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});
app.set('view engine', 'pug');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev',
    { stream: logger.stream }));

app.use(routes);

app.use(errorHandler);

http.listen(PORT, logger.verbose('app is on'));

module.exports =  app;
