var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    index: {type: Number, required: true},
    name: {type: String, required: true},
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
    distance_from_start: {type: Number, required: true},
    time_from_start: {type: Number}
});

module.exports = mongoose.model('Marker', schema);
