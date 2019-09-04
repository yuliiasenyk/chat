const express = require('express');
const lobby = express.Router();
const login = require('./login');
const Room = require('.././models/room');
const logger = require('../config/winston');
const { check, validationResult } = require('express-validator');
let currentUser;

lobby.get('/lobby', login.authenticated, findAndShowRooms);

lobby.use(function(req, res, next) {
    currentUser = req.session.user;
    next();
});

lobby.post('/lobby', [check('newRoom').isLength({ min: 2 })], addNewRoom);

function findAndShowRooms(req, res) {
    Room.find({}, 'name', (err, rooms) => {
        if (err) throw new Error();
        else roomsForPug = rooms.map(room => ({'title': room.name, 'url': room.name.replace(/\s/g, '--')}));
        logger.verbose(`object for pug created`);
        res.render('lobby', {title: 'Lobby', rooms: roomsForPug})
    }).limit(10).sort({$natural:-1});
}

function addNewRoom(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
    Room.create({
        name: req.body.newRoom,
        members: [currentUser],
    }).then((data) => {
        if (data) {
            res.redirect('lobby')
        }
    })
}

module.exports = lobby;
