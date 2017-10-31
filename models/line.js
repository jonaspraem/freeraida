var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Marker = require('./marker');

var schema = new Schema({
    lineName: {type: String, required: true},
    markers: [{type: Schema.Types.ObjectId, ref: 'Marker'}],
    timestamp: {type: Date, required: true},
    danger_level: {type: String, required: true},
    tree_level: {type: String, required: true},
    rock_level: {type: String, required: true},
    cliff_level: {type: String, required: true},
    username: {type: String, required: true}
});

module.exports = mongoose.model('Line', schema);