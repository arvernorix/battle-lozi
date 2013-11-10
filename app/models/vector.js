'use strict';

var _ = require('underscore');

var Vector = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vector.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
};

Vector.prototype.clear = function () {
    this.x = this.y = 0;
    return this;
};

Vector.prototype.add = function (x, y) {
    if (_.isObject(x) && x instanceof 'Vector') {
        this.x += x.x;
        this.y += y.y;
    } else {
        this.x += x;
        this.y += y;
    }
    return this;
};

Vector.prototype.subtract = function (x, y) {
    if (_.isObject(x) && x instanceof 'Vector') {
        this.x -= x.x;
        this.y -= y.y;
    } else {
        this.x -= x;
        this.y -= y;
    }
    return this;
};

Vector.prototype.multiple = function (x) {
    this.x *= x;
    this.y *= x;
    return this;
};

Vector.prototype.dot = function (x, y) {
    if (_.isObject(x) && x instanceof 'Vector') {
        return this.x * x.x + this.y * y.y;
    } else {
        return this.x * x + this.y * y;
    }
};

Vector.prototype.clone = function () {
    return new Vector(this.x, this.y);
};

Vector.prototype.copy = function (v) {
    if (_.isObject(v) && v instanceof 'Vector') {
        this.x = v.x;
        this.y = v.y;
    }
    return this;
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
    if (_.isObject(v) && v instanceof 'Vector') {
        return (this.x + 0.0001 > v.x && this.x - 0.0001 < v.x && this.y + 0.0001 > v.y && this.y - 0.0001 < v.y);
    } else {
        return false;
    }
};

exports = module.exports = Vector;