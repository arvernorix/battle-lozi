'use strict';

var async = require('async'),
    passport = require('passport'),

    User = require('../models/user'),
    Account = require('../models/account');

var Passport = function () {

    // Setup serialization and deserialization methods
    this.serializeUser(function (user, done) {
        done(null, user._id);
    });

    this.deserializeUser(function (id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Generic callback
    this.callback = function (provider, req, token, secret, profile, done) {

        var strategy = strategies[provider],
            uid = strategy.uid(profile);

        Account
        .findOne({ provider: provider, uid: uid })
        .populate('user')
        .exec(function (err, account) {
            if (err) {
                app.log.error('Error while finding account ("%s", "%s")!', provider, uid, { error: err });
                return done(err);
            }

            if (account) {
                // Only if account has associating user
                if (account.user) {
                    if (req.user && req.user._id.toString() !== account.user._id.toString()) {
                        return done(new Error('Account ("%s", "%s") already has associating user!', provider, uid));
                    }

                    account.token = token;
                    account.secret = secret;

                    account.save(function (err) {
                        if (err) {
                            app.log.error('Cannot update tokens for account ("%s", "%s")!', provider, uid, { error: err });
                            return done(err);
                        }
                        done(null, account.user);
                    });

                } else {
                    done(new Error('Account ("%s", "%s") has no associating user!', provider, uid));
                }

            } else {
                var user = req.user || strategy.user(profile),
                    account = new Account({
                        provider: provider,
                        uid: uid,

                        token: token,
                        secret: secret,

                        user: user
                    });

                var tasks = [];
                if (!req.user) {
                    tasks.push(user.save.bind(user));
                }
                tasks.push(function (callback) {
                    tasks.push(account.save.bind(account));
                });

                async.series(tasks, function (err) {
                    if (err) {
                        app.log.error('Error while saving user or account ("%s", "%s")!', provider, uid, { error: err });
                        return done(err);
                    }
                    done(null, user);
                });
            }
        });

    };

    // Strategies
    var strategies = {
        facebook: require('./passport/facebook')
    };

    for (var provider in strategies) {
        if (strategies.hasOwnProperty(provider)) {
            this.use(strategies[provider]);
        }
    }

};

Passport.call(passport);

exports = module.exports = passport;
