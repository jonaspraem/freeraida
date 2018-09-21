const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Profile = require('./profile');

const schema = new Schema({
    content: {type: String, required: true},
    user_address: {type: String},
    display_name: {type: String},
    timestamp: {type: Date},
    gnarly: [{type: String}]
});

schema.pre('remove', (next) => {
    const model = this;
    Profile.findOne({user_address: model.user_address}, (err, profile) => {
        profile.posts.pull(model._id);
        profile.save();
        next();
    });
});

module.exports = mongoose.model('Post', schema);