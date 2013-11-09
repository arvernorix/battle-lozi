'use strict';

var define = require('../../node_modules/constants').define,
    extend = require('extend');

var ObjectHelper = function () {

    this.define = define.bind(this);

    this.pick = function (obj, keys) {
        var ret = {};
        for(var i = 0; i < keys.length; i++) {
            var parts = keys[i].split('.'),
                o = obj;
            for (var j = 0; j < parts.length; j++){
                o = o[parts[j]];
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
