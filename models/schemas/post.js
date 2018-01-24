var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Profile = require('./profile');

var schema = new Schema({
    content: {type: String, required: true},
    user_address: {type: String},
    display_name: {type: String},
    timestamp: {type: Date},
    gnarly: [{type: String}]
});

schema.pre('remove', function(next) {
    var model = this;
    Profile.findOne({user_address: model.user_address}, function(err, profile) {
        profile.posts.pull(model._id);
        profile.save();
        next();
    });
});

module.exports = mongoose.model('Post', schema);