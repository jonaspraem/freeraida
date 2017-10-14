var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Profile = require('./profile');

var schema = new Schema({
    content: {type: String, required: true},
    username: {type: String},
    timestamp: {type: Date}
});

schema.post('remove', function(post) {
    Profile.findOne({username: post.username}, function(err, profile) {
        profile.posts.pull(post._id);
        profile.save();
    });
});

module.exports = mongoose.model('Post', schema);