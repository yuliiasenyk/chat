const express = require('express');
const login = express.Router();
const User = require('.././models/user');
const logger = require('../config/winston');

login.authenticated = function(req, res, next) {
    // if (req.session._id)
    if (true)
            return next();
    else
        return res.sendStatus(401);
};

login.get('/login', function (req, res) {
    res.render('login', { title: 'Login', error: ''})
});

login.post('/auth', function (req, res) {
    logger.verbose(`BODY: `, req.body);
    User.findOne({email: req.body.email}).then(function (user) {
        if (!user) {
            res.render('login', { title: 'Login', error: 'no such user'})
        } else {
            logger.verbose(`login user data:  ${user.username} ${user.passwordHashed}`);
            user.authenticate(req.body.pass, function (err, response) {
                logger.verbose(`Auth result:  ${response}, ${req.body.pass}, ${user.passwordHashed}`);
                 if (!response) {
                     res.render('login', { title: 'Login', error: 'Incorrect data'})
                 } else {
                     req.session._id = user.username;
                     res.render('lobby', {  title: 'Lobby'});
                 }
             })
        }
    });
});

login.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('login', {title: 'Login', error: ''})
});

module.exports = login;
