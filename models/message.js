const mongoose = require('../mongo');

const messageSchema = new mongoose.Schema({
    text: {
            type: String,
            required: true,
        },
    from: {
        type: String,
        required: true,
    },
    to: String,
    timestamp : {
        type : Date,
        default: Date.now
    },
    room: String,
});

let Message = mongoose.model("Message", messageSchema);

module.exports = Message;
