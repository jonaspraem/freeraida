import * as bcrypt from 'bcryptjs';
import { Document, Schema, Model, model } from 'mongoose';
import { IUserCredentialsDocument } from '../documents/user-credentials.document';
const mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IUser extends IUserCredentialsDocument {
    comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
    hashPassword(password: string): boolean;
}

export const schema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

schema.method('comparePassword', function (password: string): boolean {
    return bcrypt.compare(password, this.password);
});

schema.static('hashPassword', (password: string): string => {
    return bcrypt.hashSync(password);
});

// hashing the password before saving it to the database
// schema.pre('save', function(next) {
//     const user = this;
//     const SALT_WORK_FACTOR = 7;
//
//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) {
//         return next();
//     }
//     // password changed so we need to hash it (generate a salt)
//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//         if (err) {
//             return next(err);
//         } else {
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });
//         }
//     });
// });
//
// schema.methods.validPassword = function(password, callback) {
//     console.log('comparing password');
//     bcrypt.compare(password, this.password, (err, isMatch) => {
//         if (err) {
//             return callback(err);
//         }
//         else {
//             callback(null, isMatch);
//         }
//     });
// };

schema.plugin(mongooseUniqueValidator);

export const UserCredentials: IUserModel = model<IUser, IUserModel>('UserCredentials', schema);

export default UserCredentials;