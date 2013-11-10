'use strict';

(function (global) {

    define([
        'require',

        'vendor/jquery',
        'vendor/two',

        'app/templates/game/characters/lozi'
    ],

    function (require) {

        var $ = global.$,
            Two = global.Two;

        var ViewLoader = function () {};

        ViewLoader.prototype.load = function (name, parent) {
            var generate = require('app/templates/game/' + name),
                $assets = $(generate()).find('svg'),
                sprites = [];

            $assets.each(function(index, el) {
                var shape = Two.Utils.read.svg.call(parent, el).center();

                shape.height = parseInt($(el).attr('height'), 10);
                shape.width = parseInt($(el).attr('width'), 10);

                shape.visible = false;
                shape.scale = 1;

                sprites.push(shape);
            });

            return sprites;
        };

        return new ViewLoader();

    });

})(this);
