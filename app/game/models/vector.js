'use strict';

(function () {

    var createVector = function (coreConfig) {

        var Vector = function (x, y) {
            this.x = x || 0;
            this.y = y || 0;
        };

        Vector.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };

        Vector.prototype.clear = function () {
            this.x = this.y = 0;
        };

        Vector.prototype.add = function (x, y) {
            if (x instanceof Vector) {
                this.x += x.x;
                this.y += x.y;
            } else {
                this.x += x;
                this.y += y;
            }
        };

        Vector.prototype.subtract = function (x, y) {
            if (x instanceof Vector) {
                this.x -= x.x;
                this.y -= x.y;
            } else {
                this.x -= x;
                this.y -= y;
            }
        };

        Vector.prototype.multiple = function (r) {
            this.x *= r;
            this.y *= r;
        };

        Vector.prototype.dot = function (x, y) {
            if (x instanceof Vector) {
                return this.x * x.x + this.y * x.y;
            }
            return this.x * x + this.y * y;
        };

        Vector.prototype.clone = function () {
            return new Vector(this.x, this.y);
        };

        Vector.prototype.copy = function (v) {
            this.x = v.x;
            this.y = v.y;
        };

        Vector.prototype.magnitude = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };

        Vector.prototype.normalize = function () {
            var magnitude = this.magnitude();
            this.x /= magnitude;
            this.y /= magnitude;
        };

        Vector.prototype.equal = function (v) {
            if (v instanceof Vector) {
                return (Math.abs(this.x - v.x) < coreConfig.EPS && Math.abs(this.y - v.y) < coreConfig.EPS);
            }
            return false;
        };

        return Vector;

    };

    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        exports = module.exports = createVector(
            require('../config/core')
        );

    } else if (typeof define === 'function' && define.amd) {
        define([
            'app/game/config/core'
        ], createVector);
    }

})(this);
