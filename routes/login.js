const express = require('express');
const login = express.Router();
const User = require('.././models/user');
const logger = require('../config/winston');

login.authenticated = authenticate;

login.get('/',  renderLogin);

login.post('/auth', loginUser);

login.get('/logout', logoutUser);

function authenticate(req, res, next) {
    if (req.session.user)
        return next();
    else
        return res.sendStatus(401);
}
function renderLogin(req, res) {
    res.render('login', { title: 'Login', error: ''})
}
function loginUser(req, res) {
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
                    req.session.user = user.username;
                    res.redirect('/lobby');
                }
            })
        }
    });
}
function logoutUser(req, res) {
    req.session.destroy();
    res.redirect('/login');
}

module.exports = login;
