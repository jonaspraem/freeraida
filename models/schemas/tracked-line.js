var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Profile = require('./profile');

var schema = new Schema({
    user_id: {type: String, required: true},
    locations: [{type: Schema.Types.ObjectId, ref: 'Location'}]
});

schema.post('remove', function(line) {
    console.log('after delete');
    Profile.findOne({user_id: line.user_id}, function(err, profile) {
        console.log('profile '+profile);
        profile.tracked_lines.pull(line._id);
        profile.save();
    });
});

module.exports = mongoose.model('TrackedLine', schema);