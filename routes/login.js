const express = require('express');
const login = express.Router();
const User = require('.././models/user');
const bcrypt = require('bcrypt');
const async = require('async');

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
    User.findOne({email: req.body.email}).then(function (user) {
        if (!user) {
            res.send('Incorrect login');
        } else {
            // bcrypt.compare(req.body.password, user.password, function (err, response) {
            //     console.log(user.password);
            //     if (!response) {
            //         res.send('Incorrect password');
            //     } else {
            //         req.session._id = user.username;
            //         res.send('entered');
            //     }
            // });
            user.authenticate(req.body.password, function (err, response) {
                console.log(user.passwordEncrypted);
                if (!response) {
                    res.send('Incorrect password');
                } else {
                    req.session._id = user.username;
                    res.send('entered');
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
