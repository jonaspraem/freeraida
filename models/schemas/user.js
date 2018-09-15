const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    firstname: {type: String, required: true},
    surname: {type: String, required: true},
    password: {type: String, required: false},
    googleId: {type: String, required: false} 
});

// hashing the password before saving it to the database
schema.pre('save', function (next) {
    var user = this;

    // Check password / googleId / twitterId / etc..

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }
    // password changed so we need to hash it (generate a salt)
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        } else {
            bcrypt.hash(user.password, 10, function (err, hash){
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        }
    });
});

schema.methods.validPassword = function(password) {
    console.log('comparing password');
    bcrypt.compare(password, this.password, function(err, isMatch) {
        cb(err, isMatch);
    });
};

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);