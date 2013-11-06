'use strict';

var path = require('path'),
    _ = require('underscore'),
    async = require('async'),
    mongoose = require('mongoose'),
    redis = require('redis'),
    express = require('express');

var App = function () {

    var app = this,
        root = path.join(__dirname, '..'),

        asynchronize = function (delegation, callback) {
            if (_.isFunction(delegation)) {
                delegation.call(app);
            }
            if (_.isFunction(callback)) {
                callback();
            }
        },

        init = function (done) {
            var tasks = [];

            // Create Winston logger
            var logger = require('./core/logger');
            tasks.push(asynchronize.bind(app, function () {
                app.log = logger.create(app.config);
                app.use(logger.middleware(app.log));
            }));

            // Connect to MongoDB
            tasks.push(function (callback) {
                var c = app.config.mongo;
                mongoose.connect(c.host, c.db, c.port, function () {
                    app.log.notice('Connected to MongoDB', callback);
                });
            });

            // Favicon
            tasks.push(asynchronize.bind(app, function () {
                app.use(express.favicon(path.join(root, 'web/favicon.ico')));
            }));

            // Assets
            tasks.push(function (callback) {
                if (app.env === 'development') {
                    app.use('/css', require('less-middleware')({
                        force: true,
                        src: path.join(root, 'web/css'),
                        dest: path.join(root, 'dist/css')
                    }));
                    app.use('/js', express.static(path.join(root, 'web/js')));

                } else {
                    app.use('/js', express.static(path.join(root, 'dist/js')));
                }
                app.use('/css', express.static(path.join(root, 'dist/css')));
                app.use('/img', express.static(path.join(root, 'web/img')));
                app.log.notice('Loaded middleware for serving static files', callback);
            });

            // Express middlewares
            tasks.push(function (callback) {
                app.use(express.bodyParser());
                app.use(express.methodOverride());
                app.log.notice('Loaded Express body-parser and method-overriding middlewares', callback);
            });

            // Redis, cookie and session
            tasks.push(function (callback) {
                // Redis client initiation
                app.redis = redis.createClient(app.config.redis.port, app.config.redis.hostname);
                app.log.notice('Connected to Redis');

                // Redis session store
                var RedisStore = require('connect-redis')(express);
                app.sessionStore = new RedisStore({
                    client: app.redis,
                    db: app.config.redis.db,
                    prefix: app.config.session.redisPrefix
                });

                // Initializing cookie and session middlewares
                app.use(express.cookieParser(app.config.cookie.secret));
                app.use(express.session({
                    store: app.sessionStore,
                    key: app.config.session.key,
                    secret: app.config.session.secret
                }));
                app.use(require('connect-flash')());
                app.log.notice('Loaded cookie and session middleware', callback);
            });

            // Passport middleware setup
            tasks.push(function (callback) {
                var passport = require('./core/passport');
                app.use(passport.initialize());
                app.use(passport.session());
                app.log.notice('Loaded PassportJS for authentication', callback);
            });

            // Views and template engine
            tasks.push(function (callback) {
                app.set('views', path.join(root, 'app/views'));
                app.set('view engine', 'hbs');
                app.set('view options', { layout: 'layouts/base' });

                var viewLoader = require('./core/view-loader');
                viewLoader.load(app, function () {
                    app.use(viewLoader.middleware(app));
                    app.log.notice('Initialized view engine', callback);
                });
            });

            tasks.push(require('./core/router').route);

            async.series(tasks, done);
        },

        listen = function (done) {
            var port = app.config.port || 8000;
            app.listen(port, function (err) {
                if (err) {
                    return done(err);
                }
                app.log.notice('Listening on http://0.0.0.0:%d', port);
                done();
            });
        };

    this.start = function (done) {
        if (!done) {
            done = function () {};
        } else if (!_.isFunction(done)) {
            throw new Error('Invalid callback function!');
        }

        app.env = process.env.NODE_ENV || 'development';

        var utils = require('./utils');
        app.config = utils.object.deepMixin(
            require('./core/config'),
            require('../config/config')[app.env] || {}
        );

        async.series([ init, listen ], done);
    };

};

var app = express();
App.call(app);

exports = module.exports = global.app = app;
