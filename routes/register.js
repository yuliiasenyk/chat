const express = require('express');
const register = express.Router();

register.get('/register', function (req, res) {
    res.render('register', { title: 'Registration'})
});

register.post('/auth', function (req, res) {
    console.log('BODY:', req.body);
    res.render('lobby', { title: 'Lobby'})
});

module.exports = register;

