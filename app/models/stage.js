'use strict';

var ObjectGroup = require('./objectGroup'),
    Block = require('./block'),
    Pool = require('./pool');

var Stage = function () {
    this.tiles = [];
    this.blocks = new ObjectGroup();
    this.blockPool = new Pool(Block);
    this.spawningPoints = [];
    this.bots = [];
    this.players = [];
};

exports = module.exports = Stage;