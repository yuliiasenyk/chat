const express = require('express');
const register = express.Router();
const User = require('.././models/user');
const { check, validationResult } = require('express-validator');
const logger = require('../config/winston');

register.get('/register', function (req, res) {
    res.render('register', { title: 'Registration'})
});

register.post('/newUser', [
    check('username').isLength({ min: 1 }),
    check('email').isEmail(),
    check('password').isLength({ min: 1 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const initialUser = new User({username: '', email: '', passwordHashed: ''});
    initialUser.hashPassword(req.body.password, function(err, hash){
        logger.verbose(`body password and hash:  ${req.body.password}, ${hash}`);
        User.create({
            username: req.body.username,
            email: req.body.email,
            passwordHashed: hash,
        }).then((user) => {
            if(user) {
                req.session._id = user.username;
                res.render('lobby', {  title: 'Lobby'});
            }
        })})
});

module.exports = register;

