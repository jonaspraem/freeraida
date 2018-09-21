const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = require('./location');

const schema = new Schema({
    user_id: {type: String, required: true},
    duration: {type: String, required: true},
    locations: [{type: Schema.Types.ObjectId, ref: 'Location'}],
    timestamp: {type: Date}
});

schema.pre('remove', (next) => {
    const model = this;
    const profile = require('./profile');
    Location.find({_id: {$in: model.locations}}, (err, result) => {
        result.forEach((location) => {
            location.remove((err) => {});
        });
    });
    profile.findOne({user_id: model.user_id}, (err, profile) => {
        profile.tracked_lines.pull(model._id);
        profile.save();
        next();
    });
});

module.exports = mongoose.model('TrackedLine', schema);