var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = require('./post');
var Line = require('./line');

var schema = new Schema({
    user_id: {type: String, required: true},
    user_address: {type: String, required: true},
    bio: {type: String },
    img: {data: Buffer, contentType: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    lines: [{type: Schema.Types.ObjectId, ref: 'Line'}],
    following: [{type: String}],
    followers: [{type: String}]
});

module.exports = mongoose.model('Profile', schema);