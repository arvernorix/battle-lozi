'use strict';

require.config({
    baseUrl: '/js',
    shim: {
        'vendor/two': {
            exports: 'Two'
        }
    },
    paths: {
        'socket.io': '../socket.io/socket.io'
    }
});

require([
    'app/app'
],
function startApplication(app) {
    app.start();
});
