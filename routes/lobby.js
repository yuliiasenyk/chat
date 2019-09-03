const express = require('express');
const lobby = express.Router();
const login = require('./login');
const Room = require('.././models/room');
const logger = require('../config/winston');
const { check, validationResult } = require('express-validator');
const currentUser = "admin";

lobby.get('/lobby', login.authenticated, function (req, res) {
    Room.find({}, 'name', (err, rooms) => {
        if (err) throw new Error();
        else roomsForPug = rooms.map(room => ({'title': room.name, 'url': room.name.replace(/\s/g, '-')}));
        logger.verbose(`object for pug created ${roomsForPug}`);
        res.render('lobby', {title: 'Lobby', rooms: roomsForPug})
    }).limit(10).sort({$natural:-1});
});

lobby.post('/lobby', [check('newRoom').isLength({ min: 2 })], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
    Room.create({
        name: req.body.newRoom,
        members: [currentUser],
    }).then((data) => {
        if (data) {
            res.render('lobby', {title: 'Lobby', rooms: roomsForPug})
        }
    })
})

module.exports = lobby;
