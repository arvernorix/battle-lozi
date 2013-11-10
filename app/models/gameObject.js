'use strict';

var Vector = require('./vector');

var GameObject = function () {
    this.id = '';
    this.x = this.y = 0;
    this.width = this.height = 40;
    this.gridX = this.gridY = 0;
    this.active = false;
    this.sprites = [];
    this.spriteStates = [];
    this.velocity = new Vector(0, 0);
};

GameObject.prototype.update = function (delta) {
    this.x = this.x + this.velocity.x * delta;
    this.y = this.y + this.velocity.y * delta;
    return this;
};

exports = module.exports = GameObject;