const express = require('express');
const register = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

register.get('/register', function (req, res) {
    res.render('register', { title: 'Registration'})
});

register.post('/newUser', [
    check('username').isLength({ min: 1 }),
    check('email').isEmail(),
    check('password').isLength({ min: 1 })
], (req, res, user) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    //     User.create({
    //         username: req.body.username,
    //         email: req.body.email,
    //         password: hash
    //     }).then(function(data) {
    //         if (data) {
    //             req.session._id = req.body.username;
    //             res.redirect('/lobby');
    //         }
    //     });
    // });
    User.encryptPassword(req.body.password, function(err){
        User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).then((data) => {
        if(data) {
            req.session._id = name;
            res.redirect('/lobby');
        }
    })})
});

module.exports = register;

