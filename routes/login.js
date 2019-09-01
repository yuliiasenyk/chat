const express = require('express');
const login = express.Router();
const User = require('.././models/user');

login.authenticated = function(req, res, next) {
    if (req.session._id)
        return next();
    else
        return res.sendStatus(401);
};

login.get('/login', function (req, res) {
    res.render('login', { title: 'Login', error: ''})
});

login.post('/auth', function (req, res) {
    console.log('BODY:', req.body);
    User.findOne({email: req.body.email, password: req.body.pass}, (err, users) => {
        if (err) {
            res.render('login', {title: 'Login', error: 'invalid data'});
        } else   {
                req.session._id = users.username;
                console.log(users.username);
                res.render('lobby', {title: 'Lobby'});
            }
    })
})

let user;
User.findOne({username: 'A'}, (err, users) => {
    if (err) throw err;
    user = users.username;
});

login.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('login', {title: 'Login', error: ''})
});

module.exports = login;
