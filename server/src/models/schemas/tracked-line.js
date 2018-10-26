const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MODEL_PATH = './';
const Location = require(MODEL_PATH + 'location');
const Profile = require(MODEL_PATH + 'user-profile');

const schema = new Schema({
    user_id: {type: String, required: true},
    duration: {type: String, required: true},
    locations: [{type: Schema.Types.ObjectId, ref: 'Location'}],
    timestamp: {type: Date}
});

schema.pre('remove', (next) => {
    const model = this;
    Location.find({_id: {$in: model.locations}}, (err, result) => {
        result.forEach((location) => {
            location.remove((err) => {});
        });
    });
    Profile.findOne({user_id: model.user_id}, (err, profile) => {
        profile.tracked_lines.pull(model._id);
        profile.save();
        next();
    });
});

module.exports = mongoose.model('TrackedLine', schema);