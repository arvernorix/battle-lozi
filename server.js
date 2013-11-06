'use strict';

var nko = require('nko'),
    fs = require('fs'),

    app = require('./app/app');

nko('3_Mk0APeN1ebtVr7', function (err, res) {
    if (err && err.message !== 'NODE_ENV !== production') {
        throw err;
    }
    if (res) {
        res.on('data', function (data) {
            console.info(d.toString());
        });
    }
});

app.start(function (err) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }

    if (process.getuid() === 0) {
        fs.stat(__filename, function(err, stats) {
            if (err) {
                return console.error(err);
            }
            process.setuid(stats.uid);
        });
    }
});
