const express = require('express');
const router = express.Router();
const Message = require('./mongo');
const login = require('./routes/login');
const lobby = require('./routes/lobby');
const notFound = require('./routes/notFound');
const register = require('./routes/register');
const room = require('./routes/room');

router.get('/', function (req, res) {
    res.render('login', { title: 'Login'})
})

router.use('/', login)
router.use('/', lobby)
router.use('/', register)
router.use('/', room)
router.use('/', notFound)

router.get('/', function (req, res, next) {
    try {
        throw new Error('BROKEN');
        res.render('login', { title: 'Login'});
    }
    catch(e) {
        next(e)
    }
});

module.exports = router;
