var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

schema.pre('remove', function(next) {
    var model = this;
    var profile = require('./profile');
    Marker.find({_id: {$in: model.markers}}, function(err, result) {
        result.forEach(function(marker) {
            marker.remove(function(err) {});
        });
    });
    profile.findOne({user_id: model.user_id}, function(err, profile) {
        profile.lines.pull(model._id);
        profile.save();
        next();
    });
});

module.exports = mongoose.model('Line', schema);