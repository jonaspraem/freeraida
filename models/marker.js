var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    markerName: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
});

module.exports = mongoose.model('Marker', schema);
