'use strict';

var winston = require('winston');

var Logger = function () {

    var LOG_CONFIG = {
        levels: {
            debug: 0,
            info: 1,
            notice: 2,
            warn: 3,
            error: 4,
            crit: 5,
            alert: 6,
            emerg: 7,
        },
        colors: {
            debug: 'magenta',
            info: 'green',
            notice: 'cyan',
            warn: 'yellow',
            error: 'red',
            crit: 'red',
            alert: 'red',
            emerg: 'red',
        }
    };

    this.create = function (config) {
        var env = config.env || 'development',
            opts = config.logger || {},
            logger = new winston.Logger(LOG_CONFIG);

        switch (opts.type) {
            case 'console':
                var level = opts.level || 'debug';
                if (typeof LOG_CONFIG.levels[level] === 'undefined') {
                    throw new Error('Bad logger level!');
                }

                logger.add(winston.transports.Console, {
                    level: level,
                    colorize: true
                });
                break;

            default:
                throw new Error('Bad logger type!');
        }

        return logger;
    };

    this.middleware = function (logger) {
        return function (req, res, next) {
            var content = req.method + ' ' + req.url,
                start = new Date(),
                end = res.end;

            res.end = function () {
                var meta = {
                    status: res.statusCode,
                    elapsed: new Date() - start
                };

                var level;
                if (res.statusCode >= 200 && res.statusCode <= 399) {
                    level = 'info';
                } else if (res.statusCode >= 500 && res.statusCode <= 599) {
                    level = 'error';
                } else {
                    level = 'warn';
                }

                logger[level](content, meta);

                end.apply(res, arguments);
            };

            next();
        };
    };

};

exports = module.exports = new Logger();
