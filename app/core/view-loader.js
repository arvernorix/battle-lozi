'use strict';

var User = require('../models/user');

var ViewLoader = function () {

    this.middleware = function (app) {
        return function (req, res, next) {
            var user = req.user || User.ANONYMOUS;

            app.locals({
                locals: {
                    env: app.env,

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
