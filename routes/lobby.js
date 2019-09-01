const express = require('express');
const lobby = express.Router();
const login = require('./login');

lobby.get('/lobby', login.authenticated, function (req, res) {
    res.render('lobby', { title: 'Lobby'})
});

module.exports = lobby;
