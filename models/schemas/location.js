var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    elevation: {type: Number, required: true},
    resolution: {type: Number, required: true},
});

module.exports = mongoose.model('Location', schema);