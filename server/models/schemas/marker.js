const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = require('./location');

const schema = new Schema({
    index: {type: Number, required: true},
    name: {type: String, required: true},
    location: {type: Schema.Types.ObjectId, ref: 'Location'},
    distance_from_start: {type: Number, required: true},
    time_from_start: {type: Number}
});

schema.pre('remove', (next) => {
    const model = this;
    Location.findOne({_id: model.location}, (err, location) => {
        location.remove((err) => {
            next();
        });
    });
});

module.exports = mongoose.model('Marker', schema);
