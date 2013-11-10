'use strict';

(function () {

    var createCoreConfig = function () {

        return {

            EPS: 1e-3,

            DX: [ 0, 0, -1, 1, 0],
            DY: [ 0, -1, 0, 0, 1 ],

            ID_MAX: 1e9,

            GRID_SIZE: 40,
            FIELD_WIDTH: 30,
            FIELD_HEIGHT: 15

        };

    };

    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        exports = module.exports = createCoreConfig();

    } else if (typeof define === 'function' && define.amd) {
        define(createCoreConfig);
    }

})(this);
