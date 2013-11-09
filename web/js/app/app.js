/* global $ */

'use strict';

define([
    'socket.io',
    'vendor/two',
    'vendor/jquery'
],

function (io, Two) {

    var App = function () {

        this.start = function startApplication() {
            console.log('Application\'s started!');

            var socket = io.connect('/');
            socket.on('news', function (data) {
                console.log(JSON.stringify(data));
                socket.emit('other', { message: 'Hello from Socket.IO client!' });
            });

            var config = {
                gridSize: 50
            };

            var map = {
                size: {
                    row: 5,
                    col: 5
                },
                tiles: [
                    [ 0, 0, 0, 0, 0 ],
                    [ 0, 1, 0, 3, 0 ],
                    [ 0, 0, 0, 0, 0 ],
                    [ 0, 2, 0, 4, 0 ],
                    [ 0, 0, 'S', 0, 0 ]
                ]
            };

            var two = new Two({
                width: 250,
                height: 250,
                autostart: false
            }).appendTo(document.getElementById('main'));

            two.makeRectangle(125, 125, 250, 250).fill = '#5FD78C';

            // var block = two.interpret('/')

            var drawTiles = function () {

            };

            two.bind('update', function () {
                drawTiles();
            });

            $('#start').on('click', function () {
                two.play();
            });
        };

    };

    return new App();

});
