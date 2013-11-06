'use strict';

var define = require('../../node_modules/constants').define,
    extend = require('extend'),
    _ = require('underscore');

var ObjectHelper = function () {

    this.define = define.bind(this);

    this.pick = function (obj, keys) {
        var ret = {};
        for(var i = 0; i < keys.length; i++) {
            var path = keys[i].split('.'),
                o = obj;
            for (var j = 0; j < str.length; j++){
                o = o[str[j]];
            }
            ret[keys[i]] = o;
        }
        return ret;
    };

    this.extend = extend.bind(this);
    this.deepExtend = extend.bind(this, true);

    this.mixin = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift({});
        return extend.apply(null, args);
    };

    this.deepMixin = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift({});
        args.unshift(true);
        return extend.apply(null, args);
    };

};

exports = module.exports = new ObjectHelper();
