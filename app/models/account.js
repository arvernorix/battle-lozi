'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    provider: { type: String, required: true },
    uid: { type: String, required: true },

    token: String,
    secret: String,

    user: { type: Schema.ObjectId, ref: 'User' }
});

schema.index({ user: 1 });
schema.index({ provider: 1, uid: 1 });

exports = module.exports = mongoose.model('Account', schema);
