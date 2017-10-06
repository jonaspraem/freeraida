var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String },
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Profile', schema);