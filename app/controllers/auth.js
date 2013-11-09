'use strict';

var passport = require('passport');

var AuthController = function () {

    app.get('/login', function (req, res) {
        if (req.user) {
            return res.redirect('/');
        }
        res.render('login/login', {
            title: 'Login'
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {
        callbackURL: '/auth/facebook/callback'
    }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        successFlash: 'Welcome to Battle LOZI!',
        failureRedirect: '/login',
        failureFlash: 'Authentication failed! Please try again later.'
    }));

};

exports = module.exports = new AuthController();
