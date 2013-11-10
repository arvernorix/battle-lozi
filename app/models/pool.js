'use strict';

var Pool = function (type) {
    this.size = 0;
    this.objects = [];
    this.type_ = type;
};

Pool.prototype.allocate = function () {
    var obj = null;
    if (this.objects[this.size - 1].active) {
        obj = new this.type_();
        this.size = this.objects.unshift(obj);
        obj.active = true;
        return obj;
    } else {
        obj = this.objects.pop();
        this.objects.unshift(obj);
        obj.active = true;
        return obj;
    }
};

Pool.prototype.preAllocate = function (size) {
    for (var i = 0; i < size; i++) {
        var obj = new this.type_();
        this.objects.push(obj);
    }
    this.size = size;
};

Pool.prototype.free = function (object) {
    var index = this.objects.indexOf(object);
    if (index >= 0) {
        object.active = false;
        this.objects = this.objects.slice(0, index).concat(this.objects.slice(index + 1, this.objects.length));
        this.objects.push(object);
    }
};

exports = module.exports = Pool;