var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    elevation: {type: Number},
    resolution: {type: Number}
});

module.exports = mongoose.model('Location', schema);