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

userSchema.methods = {
    authenticate: function (plainPassword, cb) {
        return bcrypt.compare(plainPassword, this.passwordEncrypted, cb);
    },

    encryptPassword: function (password) {
        return bcrypt.hash(password, SALT_WORK_FACTOR, cb);
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

let User = mongoose.model("User", userSchema);

module.exports = User;
