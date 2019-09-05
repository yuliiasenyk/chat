const express = require('express');
const room = express.Router();
const Message = require('.././models/message');
const Room = require('.././models/room');
const User = require('.././models/user');
const login = require('./login');
const logger = require('../config/winston');
const async = require('async');
let currentUser;

room.use(setCurrentUser);
room.get('/:id', login.authenticated, getRoom);

function getRoom(req, res) {
    let roomID = req.params.id;
    let roomName = roomID.replace(/--/g, ' ');
    Room.findOne({name: roomName}, (error, chosenRoom) => {
        if (!chosenRoom) {res.render('error', {error: 'no such page!'})}
        else {
            Room.findOne({name: roomName, members: {"$in": currentUser }}, (error, roomUser) => {
                    if(!roomUser) {
                        User.findOneAndUpdate({username: currentUser}, {$set:{currentRoom: roomName}});
                        res.render('joinRoom');}
                    else {
                        User.findOneAndUpdate({username: currentUser}, {$set:{currentRoom: roomName}}, (e, newcomer) =>
                         {
                             currentRoom = newcomer.currentRoom;
                             console.log('newcomer name and room:', newcomer.username, newcomer.currentRoom);
                             Message.find({room: currentRoom}, (err, messages) => {
                                logger.verbose(`SESSION: ${currentRoom}`);
                                messagesForPug = messages.map(data => ({
                                    'message': data.text,
                                    'user': `${data.from}: `,
                                    'time': data.timestamp.toLocaleTimeString(),
                                }));
                                // logger.verbose(`message list created`);
                                res.render('room', {title: 'Room', messages: messagesForPug, roomName: currentRoom, members: `MEMBERS: ${chosenRoom.members.length}`, user: currentUser})
                        }).limit(20).sort({$natural: -1});
                         });
                    }
                }
            )
        }
    })
}

function setCurrentUser(req, res, next) {
    currentUser = req.session.user;
    next();
}

module.exports = room;
