const express = require('express');
const router = express.Router();
const login = require('./routes/login');
const lobby = require('./routes/lobby');
const notFound = require('./routes/notFound');
const register = require('./routes/register');
const room = require('./routes/room');


// router.use(function(req, res, next) {
//     if (req.session.user == null){
//         res.redirect('login');
//     }   else{
//         res.redirect('lobby');
//     }
// });

router.get('/', (req, res) => {
    if (req.session.user == null){
        res.redirect('login');
    } else {
        res.redirect('lobby');
    }
})

router.get('/login', router.use(login));
router.get('/lobby', router.use(lobby));
router.get('/register', router.use(register));
router.get('/room', router.use(room));
router.get('/notFound', router.use(notFound));

module.exports = router;
