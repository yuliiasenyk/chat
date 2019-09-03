const mongoose = require('../mongo');

const roomSchema = new mongoose.Schema({
    name: {
            type: String,
            unique: true,
            required: true,
        },
    members: Array,
});
let Room = mongoose.model("Room", roomSchema);

module.exports = Room;

