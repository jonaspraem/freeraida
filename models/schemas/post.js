var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Profile = require('./profile');

var schema = new Schema({
    content: {type: String, required: true},
    user_address: {type: String},
    display_name: {type: String},
    timestamp: {type: Date},
    gnarly: [{type: String}],
});

schema.post('remove', function(post) {
    Profile.findOne({user_id: post.user_id}, function(err, profile) {
        profile.posts.pull(post._id);
        profile.save();
    });
});

module.exports = mongoose.model('Post', schema);