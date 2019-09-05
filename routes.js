const express = require('express');
const router = express.Router();
const login = require('./routes/login');
const lobby = require('./routes/lobby');
const notFound = require('./routes/notFound');
const register = require('./routes/register');
const joinRoom = require('./routes/joinRoom');
const room = require('./routes/room');


router.get('/', authRoute)
router.use('/login', login);
router.use('/lobby', lobby);
router.use('/register', register);
router.use('/room', room);
router.use('/join', joinRoom);
router.use('/notFound', notFound);

function authRoute(req, res)  {
    (req.session.user == null) ?  res.redirect('login') : res.redirect('lobby');
}

module.exports = router;
