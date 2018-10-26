import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    username: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    surname: {type: String, required: true},
    fullname: {type: String, required: true},
    country: {type: String, required: false},
    bio: {type: String, required: false},
    social_twitter: {type: String, required: false},
    social_instagram: {type: String, required: false},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    lines: [{type: Schema.Types.ObjectId, ref: 'Line'}],
    tracked_lines: [{type: Schema.Types.ObjectId, ref: 'TrackedLine'}],
    following: [{type: String}],
    followers: [{type: String}],
    img: {data: Buffer, contentType: String},
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('UserProfile', schema);