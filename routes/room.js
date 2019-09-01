const express = require('express');
const room = express.Router();
const Message = require('.././models/message');
const login = require('./login');

room.get('/room', login.authenticated, function (req, res) {
    res.render('room', { title: 'Room', message: firstMessage, user: user})
});

room.post('/message', function (req, res) {
    res.json({sentMessage: req.body.message});
});

let firstMessage, user;

Message.findOne({from: 'B'}, (err, messages) => {
        if (err) throw err;
        firstMessage = `: ${messages.text}`;
        user = messages.from;
});

module.exports = room;
