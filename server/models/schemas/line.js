const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Marker = require('./marker');

const schema = new Schema({
    name: {type: String, required: true},
    line_type: {type: String, required: true},
    markers: [{type: Schema.Types.ObjectId, ref: 'Marker'}],
    timestamp: {type: Date, required: true},
    danger_level: {type: String, required: true},
    tree_level: {type: String, required: true},
    rock_level: {type: String, required: true},
    cliff_level: {type: String, required: true},
    user_id: {type: String, required: true},
    confirmed: {type: Boolean}
});

schema.pre('remove', (next) => {
    const model = this;
    const profile = require('./user-profile');
    Marker.find({_id: {$in: model.markers}}, (err, result) => {
        result.forEach((marker) => {
            marker.remove((err) => {});
        });
    });
    profile.findOne({user_id: model.user_id}, (err, profile) => {
        profile.lines.pull(model._id);
        profile.save();
        next();
    });
});

module.exports = mongoose.model('Line', schema);