const mongoose = require('../mongo');

const messageSchema = new mongoose.Schema({
    text: String,
    from: String,
    to: String,
});
let Message = mongoose.model("Message", messageSchema);

module.exports = Message;
