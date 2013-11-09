'use strict';

var cookie = require('cookie'),
    connect = require('connect'),
    socketIO = require('socket.io'),

    User = require('../models/user');

var io = socketIO.listen(app.server, {
    logger: app.log,
    transports: [
        'websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]
});

io.configure('production', function () {
    io.set('log level', 1);
    io.enable('browser client minification');
    io.enable('browser client etag');
    io.enable('browser client gzip');
});

io.set('authorization', function (handshakeData, callback) {
    if (handshakeData.headers.cookie) {
        var sessionKey = app.config.session.key,
            sessionSecret = app.config.session.secret;

        handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
        handshakeData.sessionId = connect.utils.parseSignedCookie(handshakeData.cookie[sessionKey], sessionSecret);

        if (handshakeData.cookie[sessionKey] === handshakeData.sessionId) {
            return callback(new Error('Invalid cookie!'));
        }

    } else {
        return callback(new Error('No cookie!'));
    }

    app.sessionStore.get(handshakeData.sessionId, function (err, data) {
        if (err) {
            return callback(err);
        }

        var userId = (data && data.passport ? data.passport.user : null);
        if (!userId) {
            return callback(null, false);
        }

        User.findById(userId, function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, false);
            }

            handshakeData.user = user;

            callback(null, true);
        });
    });
});

exports = module.exports = io;
