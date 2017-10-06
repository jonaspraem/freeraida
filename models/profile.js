var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    username: {type: String, required: true},
    bio: {type: String },
    img: {data: Buffer, contentType: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    following: [{type: Schema.Types.ObjectId, ref: 'User'}],
    followers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Profile', schema);