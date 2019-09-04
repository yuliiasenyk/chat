const sessionInit = {};

sessionInit.init = function(req, res, next) {
    if (req.session && req.session.user) {
        sessionInit.currentUser = req.session.user;
        sessionInit.currentRoom = req.session.room;
        next();
    } else {
        next();
    }
}

module.exports = sessionInit;
