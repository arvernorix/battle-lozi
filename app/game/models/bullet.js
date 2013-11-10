'use strict';

var GameObject = require('./gameObject');

var Bullet = function () {
    GameObject.apply(this, arguments);
};

Bullet.prototype = GameObject.prototype;
