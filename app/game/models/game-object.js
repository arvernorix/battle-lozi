'use strict';

(function () {

    var createGameObject = function (
        Two,
        coreConfig, objectConfig,
        Vector,
        viewLoader
    ) {

        var GameObject = function (game, object, gx, gy, direction) {
            if (!object || !objectConfig[object]) {
                throw new Error('Invalid object!');
            }

            var config = objectConfig[object];

            this.id = Math.floor(Math.random() * coreConfig.ID_MAX);
            this.object = object;

            this.directionSprites = config.directionSprites;
            this.spriteConfig = config.sprites;

            this.speed = config.speed;
            this.velocity = [];
            for (var i = 0; i < coreConfig.DX.length; i++) {
                this.velocity[i] = new Vector(coreConfig.DX[i] * this.speed, coreConfig.DY[i] * this.speed);
            }

            this.gx = gx || 0;
            this.gy = gy || 0;

            this.x = this.gx * coreConfig.GRID_SIZE + coreConfig.GRID_SIZE / 2;
            this.y = this.gy * coreConfig.GRID_SIZE + coreConfig.GRID_SIZE / 2;

            this.direction = direction || config.defaultDirection;

            if (Two) {
                this.two = new Two.Group();
                game.two.add(this.two);
                this.sprites = viewLoader.load(object, this.two);
            }

            this.setDefaultSprite();
        };

        GameObject.prototype.setDefaultSprite = function () {
            if (this.direction !== 0) {
                this.oldSpriteIndex = this.spriteIndex;
                this.spriteIndex = this.directionSprites[this.direction];
            }

            if (typeof this.oldSpriteIndex === 'undefined') {
                this.oldSpriteIndex = this.spriteIndex;
            }

            this.triggerSpriteChange();
        };

        GameObject.prototype.triggerSpriteChange = function () {
            // Dummy center point of current sprite
            var cx = this.spriteConfig[this.spriteIndex].cx,
                cy = this.spriteConfig[this.spriteIndex].cy;

            // Dummy center point of previous sprite
            var ocx = this.spriteConfig[this.oldSpriteIndex].cx,
                ocy = this.spriteConfig[this.oldSpriteIndex].cy;

            // Actual center point of current sprite
            var acx = this.spriteConfig[this.spriteIndex].width / 2,
                acy = this.spriteConfig[this.spriteIndex].height / 2;

            // Actual center point of previous sprite
            var oacx = this.spriteConfig[this.oldSpriteIndex].width / 2,
                oacy = this.spriteConfig[this.oldSpriteIndex].height / 2;

            if (!this.translation) {
                this.translation = new Vector(oacx - ocx, oacy - ocy);
            }

            this.translation.add((acx - cx) - (oacx - ocx), (acy - cy) - (oacy - ocy));

            if (Two) {
                this.sprites[this.spriteIndex].visible = true;
                this.two.translation.set(this.x + this.translation.x, this.y + this.translation.y);
                if (this.oldSpriteIndex !== this.spriteIndex) {
                    this.sprites[this.oldSpriteIndex].visible = false;
                }
            }
        };

        return GameObject;

    };

    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        exports = module.exports = createGameObject(
            null,
            require('../config/core'),
            require('../config/object'),
            require('./vector'),
            require('../core/view-loader')
        );

    } else if (typeof define === 'function' && define.amd) {
        define([
            'vendor/two',
            'app/game/config/core',
            'app/game/config/object',
            'app/game/models/vector',
            'app/game/core/view-loader'
        ], createGameObject);
    }

})(this);
