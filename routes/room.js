const express = require('express');
const room = express.Router();
const Message = require('.././models/message');
const login = require('./login');
const logger = require('../config/winston');
const { check, validationResult } = require('express-validator');

room.get('/:id', login.authenticated, function (req, res) {
        Message.find({room: req.params.id}, (err, messages) => {
            if (err) {throw new Error()}
            else {
                messagesForPug = messages.map(data => ({
                'message': data.text,
                'user': `${data.from}: `,
                'time': data.timestamp.toLocaleTimeString()
            }));
            logger.verbose(`message list created - ${messagesForPug}`);
            res.render('room', {title: 'Room', messages: messagesForPug, roomName: req.params.id})
        }
        }).limit(20).sort({$natural: -1});
    });



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

module.exports = room;
