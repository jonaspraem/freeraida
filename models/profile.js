var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = require('./post');

var schema = new Schema({
    username: {type: String, required: true},
    bio: {type: String },
    img: {data: Buffer, contentType: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    following: [{type: String}],
    followers: [{type: String}]
});

module.exports = mongoose.model('Profile', schema);