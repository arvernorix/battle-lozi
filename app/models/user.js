'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    displayName: String
});

var Model = mongoose.model('User', schema);

Model.ANONYMOUS = new Model({
    displayName: 'Anonymous'
});

exports = module.exports = Model;
