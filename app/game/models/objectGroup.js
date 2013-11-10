'use strict';

var ObjectGroup = function () {
    this.objects = [];
};

ObjectGroup.prototype.add = function (object) {
    this.objects.push(object);
    return this;
};

ObjectGroup.prototype.removeAt = function (index) {
    if (index >= this.objects.length) {
        return null;
    } else {
        var object = this.objects[index];
        this.objects = this.objects.slice(0, index).concat(this.objects.slice(index + 1, this.objects.length));
        return object;
    }
};

ObjectGroup.prototype.remove = function (object) {
    var length = this.objects.length;
    for (var i = 0; i < length; i++) {
        if (object === this.objects[i]) {
            this.objects = this.objects.slice(0, i).concat(this.objects.slice(i + 1, length));
            return true;
        }
    }
    return false;
};

ObjectGroup.prototype.clear = function () {
    this.objects = [];
    return this;
};

ObjectGroup.prototype.indexOf = function (object) {
    var length = this.objects.length;
    for (var i = 0; i < length; i++) {
        if (object === this.objects[i]) {
            return i;
        }
    }
    return -1;
};

ObjectGroup.prototype.update = function (delta) {
    var length = this.objects.length;
    for (var i = 0; i < length; i++) {
        this.objects[i].update(delta);
    }
};

exports = module.exports = ObjectGroup;
