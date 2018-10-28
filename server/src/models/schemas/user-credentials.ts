import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
const mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IUserCredentials extends mongoose.Document {
    email: string;
    username: string;
    password: string;
}

export const schema: mongoose.Schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

// hashing the password before saving it to the database
schema.pre<IUserCredentials>("save", function(next) {
    const SALT_WORK_FACTOR = 7;
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    // password changed so we need to hash it (generate a salt)
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        } else {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                this.password = hash;
                next();
            });
        }
    });
});

schema.methods.validPassword = async function(password) {
    console.log('comparing password');
    return await bcrypt.compare(password, this.password);
};

schema.plugin(mongooseUniqueValidator);
const UserCredentials = mongoose.model<IUserCredentials>('UserCredentials', schema);
export default UserCredentials;