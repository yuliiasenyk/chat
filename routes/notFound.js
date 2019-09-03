const express = require('express');
const notFound = express.Router();

notFound.use(function(req, res) {
    res.render('error', { title: 'NOTFound', error: 'No such page'});
});

module.exports = notFound;
