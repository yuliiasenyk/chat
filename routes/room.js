const express = require('express');
const room = express.Router();
const Message = require('.././models/message');
const Room = require('.././models/room');
const login = require('./login');
const logger = require('../config/winston');
const { check, validationResult } = require('express-validator');
let currentUser;

room.use(function(req, res, next) {
    currentUser = req.session.user;
    next();
});

room.get('/:id', login.authenticated, getRoom);

// Room.findOne({members: (currentUser)}, (error, user, cb) => {
//     if (error) {throw new Error() }
//     if(!user) {console.log('join first')}
//     else{
// cb()
//     }
//     })

// room.post('/room', [check('message').isLength({ min: 1 })], (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array()});
//     }
//     const newMessage = new Message({text: '', from: '', timestamp: ''});
//     // Message.create({
//     //     text: req.body.message,
//     //     from: currentUser,
//     //     timestamp: new Date(),
//     // }).then((newMessage) => {
//     //     if (newMessage) {
//     //         res.render('room', {  title: 'Room', message: newMessage.text, user: `${newMessage.from}: `, time: newMessage.timestamp.toLocaleTimeString()});
//     //     }
//     // })
// })
function getRoom(req, res) {
    let roomID = req.params.id;
    Room.findOne({name: roomID.replace(/--/g, ' ')}, (error, room) => {
        if (error) {throw new Error() }
        if(!room) {res.render('error', {error: 'no such page'})}
        else {
            Room.findOne({members: (currentUser)}, (error, user) => {
                    if (error) {throw new Error() }
                    if(!user) {console.log('join first')}
                    else
                    {
                        req.session.room = roomID;
                        Message.find({room: req.params.id}, (err, messages) => {
                            if (err) {
                                throw new Error()
                            } else {
                                logger.verbose(`SESSION: ${req.session.room}`);
                                messagesForPug = messages.map(data => ({
                                    'message': data.text,
                                    'user': `${data.from}: `,
                                    'time': data.timestamp.toLocaleTimeString(),
                                }));
                                logger.verbose(`message list created`);
                                res.render('room', {title: 'Room', messages: messagesForPug, roomName: roomID.replace(/--/g, ' '), members: `MEMBERS: ${room.members.length}`})
                            }
                        }).limit(20).sort({$natural: -1});
                    }
                }
            )
        }
    })
}
module.exports = room;
