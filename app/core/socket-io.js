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
            return callback(new Error('Cookie is invalid!'));
        }

    } else {
        return callback(new Error('No cookie!'));
    }

    app.sessionStore.get(handshakeData.sessionId, function (err, data) {
        if (err || !data) {
            return callback(err || new Error('Invalid session!'));
        }

        var userId = data.passport.user;
        User.findById(userId, function (err, user) {
            if (err || !user) {
                return callback(err || new Error('User\'s not found!'));
            }

            handshakeData.user = user;

            callback(null, true);
        });
    });
});

exports = module.exports = io;
