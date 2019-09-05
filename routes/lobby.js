const express = require('express');
const lobby = express.Router();
const login = require('./login');
const Room = require('.././models/room');
const logger = require('../config/winston');
const { check, validationResult } = require('express-validator');
const validators = [check('newRoom').isLength({ min: 2 })];
let currentUser;

lobby.use(setCurrentUser);

lobby.get('/', login.authenticated, findAndShowRooms);

lobby.post('/', validators, addNewRoom);

function findAndShowRooms(req, res) {
    const roomUrl = 'room/';
    Room.find({}, 'name', (err, rooms) => {
        if (err) throw new Error();
        else roomsForPug = rooms.map(room => {
            const escapedRoomName = room.name.replace(/\s/g, '--');
            return { 'title': room.name, 'url': roomUrl + escapedRoomName};
        });
        // logger.verbose(`object for pug created`);
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
            res.redirect('/lobby')
        }
    })
}

function setCurrentUser(req, res, next) {
    currentUser = req.session.user;
    next();
}

module.exports = lobby;
