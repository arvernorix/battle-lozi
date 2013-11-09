'use strict';

require.config({
    baseUrl: '/js',
    shim: {
        'two': {
            exports: 'Two'
        }
    },
    paths: {
        'socket.io': '../socket.io/socket.io.js'
    }
});

require([
    'app/app'
],
function startApplication(app) {
    app.start();
});
