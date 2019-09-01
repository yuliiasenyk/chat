const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const winston = require('./config/winston');
const morgan = require('morgan');
const async = require('async');
const server = require('./server');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const pug = require('pug');
const session = require('express-session');
const errorHandler = require('./errorHandler')

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'pug');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev',
    { stream: winston.stream }));

app.use(routes);

app.use(errorHandler);

app.listen(PORT);
