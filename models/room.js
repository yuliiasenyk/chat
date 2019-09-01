const mongoose = require('../mongo');

const roomSchema = new mongoose.Schema({
    name: String,
    members: Array,
});
let Room = mongoose.model("Room", roomSchema);

module.exports = Room;

