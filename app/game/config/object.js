'use strict';

(function () {

    var createObjectConfig = function () {

        return {

            'characters/lozi': {
                speed: 1.3,

                defaultDirection: 4, // down
                directionSprites: [ 0, 0, 12, 17, 7 ],

                sprites: [
                    { width: 42.862, height: 52.745, cx: 21.431, cy: 52.745 },
                    { width: 43.288, height: 52.878, cx: 21.644, cy: 52.878 },
                    { width: 43.656, height: 52.655, cx: 21.828, cy: 52.655 },
                    { width: 43.288, height: 52.878, cx: 21.644, cy: 52.878 },
                    { width: 42.862, height: 52.745, cx: 21.431, cy: 52.745 },
                    { width: 43.288, height: 52.878, cx: 21.644, cy: 52.878 },
                    { width: 43.657, height: 52.655, cx: 21.8285, cy: 52.655 },
                    { width: 56.48, height: 53.677, cx: 28.24, cy: 53.677 },
                    { width: 56.971, height: 53.286, cx: 28.4855, cy: 53.286 },
                    { width: 57.062, height: 52.783, cx: 28.531, cy: 52.783 },
                    { width: 56.972, height: 53.286, cx: 28.486, cy: 53.286 },
                    { width: 56.48, height: 53.677, cx: 28.24, cy: 53.677 },
                    { width: 56.48, height: 53.676, cx: 28.24, cy: 53.676 },
                    { width: 56.972, height: 53.284, cx: 28.486, cy: 53.284 },
                    { width: 57.062, height: 52.781, cx: 28.531, cy: 52.781 },
                    { width: 56.972, height: 53.286, cx: 28.486, cy: 53.286 },
                    { width: 56.48, height: 53.676, cx: 28.24, cy: 53.676 },
                    { width: 43.657, height: 52.654, cx: 21.8285, cy: 52.654 },
                    { width: 43.288, height: 52.878, cx: 21.644, cy: 52.878 },
                    { width: 42.862, height: 52.745, cx: 21.431, cy: 52.745 },
                    { width: 43.288, height: 52.878, cx: 21.644, cy: 52.878 },
                    { width: 43.657, height: 52.654, cx: 21.8285, cy: 52.654 },
                    { width: 43.288, height: 52.878, cx: 21.644, cy: 52.878 },
                    { width: 42.863, height: 52.745, cx: 21.4315, cy: 52.745 }
                ]
            }

        };

    };

    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        exports = module.exports = createObjectConfig();

    } else if (typeof define === 'function' && define.amd) {
        define(createObjectConfig);
    }

})(this);
