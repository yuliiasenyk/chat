const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const User = require('./models/user')

//login page: storing and comparing email and password,and redirecting to home page after login
app.post('/user', function (req, res) {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        if (!user) {
            res.redirect('/');
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result == true) {
                    res.redirect('/home');
                } else {
                    res.send('Incorrect password');
                    res.redirect('/');
                }
            });
        }
    });
});



bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    // res == false
});

async function checkUser(username, password) {
    //... fetch user from a db etc.

    const match = await bcrypt.compare(password, user.passwordHash);

    if(match) {
        //login
    }

    //...
}
