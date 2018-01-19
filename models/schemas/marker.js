var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Location = require('./location');

var schema = new Schema({
    index: {type: Number, required: true},
    name: {type: String, required: true},
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
    distance_from_start: {type: Number, required: true},
    time_from_start: {type: Number}
});

schema.pre('remove', function(next) {
    var model = this;
    Location.findOne({_id: model.location}, function(err, location) {
        location.remove(function(err) {
            next();
        });
    });
});

module.exports = mongoose.model('Marker', schema);
