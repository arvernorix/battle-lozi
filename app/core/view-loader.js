'use strict';

var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    hbs = require('hbs'),

    utils = require('../utils'),

    User = require('../models/user');

var ViewLoader = function () {

    var registerPartial = function (root, file, callback) {
            var dir = path.dirname(file),
                ext = path.extname(file),
                base = path.basename(file, ext);

            dir = dir.split(path.sep).join('/');
            base = base.substring(1);

            fs.readFile(
                path.join(root, file),
                'utf8',
                function (err, content) {
                    if (err) {
                        return callback(err);
                    }
                    hbs.registerPartial(dir + '/' + base, content);
                    console.log(dir + '/' + base);
                    callback();
                }
            );
        },

        registerPartials = function (server, callback) {
            var dir = server.get('views'),
                ext = server.get('view engine'),
                pattern = '^_.*\.' + ext + '$';
            utils.fs.traverse(dir, pattern, registerPartial.bind(this, dir), callback);
        },

        registerHelpers = function () {
            // Register additional helpers here
        };

    this.load = function (app, callback) {
        registerPartials.call(this, app, callback);
        registerHelpers();
    };

    this.middleware = function (app) {
        return function (req, res, next) {
            var user = req.user || User.ANONYMOUS;

            app.locals({
                locals: {
                    authenticated:  (req.user ? true : false),
                    user:           user,

                    flash: {
                        alert:      req.flash('alert'),
                        error:      req.flash('error'),
                        success:    req.flash('success'),
                        info:       req.flash('info')
                    }
                }
            });

            next();
        };
    };

};

exports = module.exports = new ViewLoader();
