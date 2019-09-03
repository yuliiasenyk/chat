const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./config/winston');
mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('error', function() {
    logger.verbose('DB error')
});
mongoose.connection.once('open', function() {
    logger.verbose('connected to the data base')
});

module.exports = mongoose;
