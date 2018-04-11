var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

//hashing a password before saving it to the database
schema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Profile', schema);