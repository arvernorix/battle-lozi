'use strict';

define([
    'vendor/two',
    'app/game/config/core',
    'app/game/core/view-loader'
],

function (
    Two,
    coreConfig,
    viewLoader
) {

    var Game = function () {};

    Game.prototype.init = function (el) {
        if (Two) {
            this.two = new Two({
                autostart: true,
                width: coreConfig.FIELD_WIDTH * coreConfig.GRID_SIZE,
                height: coreConfig.FIELD_HEIGHT * coreConfig.GRID_SIZE
            });
            this.el = (typeof el === 'string' ? document.getElementById(el) : el);
            this.two.appendTo(this.el);

            this.two.makeRectangle(this.two.width / 2, this.two.height / 2, this.two.width, this.two.height).fill = '#00B2EE';

            var columns = Math.round(this.two.width / coreConfig.GRID_SIZE),
                rows = Math.round(this.two.height / coreConfig.GRID_SIZE);

            for (var i = 0; i < this.two.width + coreConfig.GRID_SIZE; i += coreConfig.GRID_SIZE) {
                for (var j = 0; j < this.two.height + coreConfig.GRID_SIZE; j += coreConfig.GRID_SIZE) {
                    this.two.makeLine(i, 0, i, j);
                    this.two.makeLine(0, j, i, j);
                }
            }

            // TODO: Load map background
        }
    };

    return Game;

});
