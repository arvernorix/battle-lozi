'use strict';

require.config({
    baseUrl: '/js',
    shim: {
        'two': {
            exports: 'Two'
        }
    }
});

require([
    'app/app'
],
function startApplication(app) {
    app.start();
});
