var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Profile = require('./profile');
var Marker = require('./marker');

var schema = new Schema({
    name: {type: String, required: true},
    line_type: {type: String, required: true},
    markers: [{type: Schema.Types.ObjectId, ref: 'Marker'}],
    timestamp: {type: Date, required: true},
    danger_level: {type: String, required: true},
    tree_level: {type: String, required: true},
    rock_level: {type: String, required: true},
    cliff_level: {type: String, required: true},
    user_id: {type: String, required: true}
});

schema.post('remove', function(line) {
    console.log('after delete');
    Profile.findOne({user_id: line.user_id}, function(err, profile) {
        console.log('profile '+profile);
        profile.lines.pull(line._id);
        profile.save();
    });
});

module.exports = mongoose.model('Line', schema);