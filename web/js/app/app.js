'use strict';

define([
    'socket.io'
],

function (io) {

    var App = function () {

        this.start = function startApplication() {
            console.log('Application\'s started!');

            var socket = io.connect('/');
            socket.on('news', function (data) {
                console.log(JSON.stringify(data));
                socket.emit('other', { message: 'Hello from Socket.IO client!' });
            })
        };

    };

    return new App();

});
