const mongoose = require('../mongo');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    passwordEncrypted: {
        type: String,
        required: true,
    },
    groups: Array,
});
let User = mongoose.model("User", userSchema);

userSchema.methods = {
    authenticate: function (plainPassword) {
        return bcrypt.compare(plainPassword, this.passwordEncrypted, function (err, response) {
            console.log(user.passwordEncrypted);
            if (!response) {
                res.send('Incorrect password');
            } else {
                req.session._id = user.username;
                res.send('entered');
            }
        });
    },

    encryptPassword: function (password, name, email) {
        return bcrypt.hash(password, SALT_WORK_FACTOR);
        User.create({
            username: name,
            email: email,
            password: password,
        }).then((data) => {
            if(data) {
                req.session._id = name;
                res.redirect('/lobby');
            }
        })
    }
}
userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.passwordEncrypted = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

module.exports = User;
