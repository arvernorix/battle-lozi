'use strict';

exports = module.exports = {

    port: 8000,

    logger: {
        type: 'console',
        level: 'info'
    },

    mongo: {
        db: '',
        host: 'localhost',
        port: 27017
    },

    redis: {
        hostname: 'localhost',
        db: '',
        port: 6379
    },

    session: {
        redisPrefix: 'session:',
        key: 'sid',
        secret: ''
    },

    cookie: {
        secret: ''
    },

    passport: {
        facebook: {
            clientId: '',
            clientSecret: ''
        }
    }

};
