var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    markerName: {type: String, required: true},
    lat: {type: float, required: true},
    lng: {type: float, required: true}
});

module.exports = mongoose.model('Line', schema);
