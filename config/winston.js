const winston = require('winston');

const options = {
    file: {
        level: 'info',
        filename: `logs/app.log`,
        handleExceptions: true,
        json: true,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message.slice(0, -1).replace(/\u001b\[[0-9]{1,2}m/g, ''));
    },
};
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = logger;
