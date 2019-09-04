const Message = require('./models/message');
const sessionInit = require('./session');
const socket = {};
let currentUser = sessionInit.currentUser,
    currentRoom = sessionInit.currentRoom;

socket.init = function(socket){
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

module.exports = socket;
