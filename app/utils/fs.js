'use strict';

var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    async = require('async');

var FsUtils = function () {

    var _traverse = function (root, dir, matched, ignored, iterator, callback) {
        var self = this,
            tasks = [];

        if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
            callback();
        }

        var files = fs.readdirSync(dir);

        for (var i = 0; i < files.length; i++) {
            var file = files[i],
                filePath = path.join(dir, file),
                relativePath = path.relative(root, filePath),
                stat = fs.statSync(filePath);

            if (ignored && ignored.test(relativePath)) {
                continue;
            }

            if (stat.isDirectory()) {
                tasks.push(
                    _traverse.bind(self, root, filePath, matched, ignored, iterator)
                );

            } else if (stat.isFile() && (!matched || matched.test(file))) {
                tasks.push(
                    iterator.bind(self, relativePath)
                );
            }
        }

        async.parallel(tasks, callback);
    }

    this.traverse = function (root) {
        var args = Array.prototype.slice.call(arguments);
        if (args.length < 3 || args.length > 5) {
            throw new Error('Bad arguments!');
        }

        var matched = (args.length >= 4 ? args[1] : null),
            ignored = (args.length >= 5 ? args[2] : null),
            iterator = args[args.length - 2],
            callback = args[args.length - 1];

        if (_.isString(matched)) {
            matched = new RegExp(matched);
        }
        if (_.isString(ignored)) {
            ignored = new RegExp(ignored);
        }
        if ((matched && !(matched instanceof RegExp)) || (ignored && !(ignored instanceof RegExp)))  {
            throw new Error('File pattern must be a string or regular expression');
        }

        if (!_.isFunction(iterator) || !_.isFunction(callback)) {
            throw new Error('Iterator and callback must be valid functions');
        }

        if (!fs.existsSync(root)) {
            return callback();
        }

        _traverse.call(this, root, root, matched, ignored, iterator, callback);
    };

};

exports = module.exports = new FsUtils();
