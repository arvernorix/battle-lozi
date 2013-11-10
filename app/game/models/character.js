'use strict';

var GameObject = require('./gameObject');

var Character = function () {
    GameObject.apply(this, arguments);
};

Character.prototype = new GameObject();
Character.prototype.constructor = Character;
