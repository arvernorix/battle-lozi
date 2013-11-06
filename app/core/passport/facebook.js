'use strict';

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,

    User = require('../../models/user');

var config = app.config.passport.facebook,
    callback = passport.callback.bind(passport, 'facebook');

config.passReqToCallback = true;

var strategy = new FacebookStrategy(config, callback);

strategy.uid = function (profile) {
    return profile.id;
};

strategy.user = function (profile) {
    return new User({
        displayName: profile.displayName
    });
};

exports = module.exports = strategy;
