'use strict';

var path = require('path'),

    utils = require('../utils');

var Router = function () {

    this.route = function (done) {
        var dir = path.join(__dirname, '../controllers');
        utils.fs.traverse(dir, /\.js$/, function (file, callback) {
            require(path.join(dir, file));
            callback();
        }, done);
    };

};

exports = module.exports = new Router();
