var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Post = require('./post');
var Line = require('./line');

var schema = new Schema({
    user_id: {type: String, required: true, unique: true},
    user_address: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastName: {type: String, required: true},
    bio: {type: String},
    representation: {type: String},
    social_twitter: {type: String},
    social_instagram: {type: String},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    lines: [{type: Schema.Types.ObjectId, ref: 'Line'}],
    tracked_lines: [{type: Schema.Types.ObjectId, ref: 'TrackedLine'}],
    following: [{type: String}],
    followers: [{type: String}],
    img: {data: Buffer, contentType: String}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Profile', schema);