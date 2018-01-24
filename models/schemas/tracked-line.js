var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Location = require('./location');

var schema = new Schema({
    user_id: {type: String, required: true},
    duration: {type: String, required: true},
    locations: [{type: Schema.Types.ObjectId, ref: 'Location'}],
    timestamp: {type: Date}
});

schema.pre('remove', function(next) {
    var model = this;
    var profile = require('./profile');
    Location.find({_id: {$in: model.locations}}, function(err, result) {
        result.forEach(function(location) {
            location.remove(function(err) {});
        });
    });
    profile.findOne({user_id: model.user_id}, function(err, profile) {
        profile.tracked_lines.pull(model._id);
        profile.save();
        next();
    });
});

module.exports = mongoose.model('TrackedLine', schema);