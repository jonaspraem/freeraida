var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    locations: [{type: Schema.Types.ObjectId, ref: 'Location'}]
});

module.exports = mongoose.model('TrackedLine', schema);