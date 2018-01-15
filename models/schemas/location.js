var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    time_at: {type: Number, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
});

module.exports = mongoose.model('Location', schema);