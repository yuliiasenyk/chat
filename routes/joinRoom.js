const express = require('express');
const joinRoom = express.Router();
const Room = require('.././models/room');

joinRoom.get('/', join);

function join(req, res) {
    Room.update({name: req.params.id}, { $push: { members: req.session.user}}, () => {
    res.redirect('/lobby');
})}
module.exports = joinRoom;
