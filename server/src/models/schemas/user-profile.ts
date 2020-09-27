import * as mongoose from 'mongoose';
import { SPORTS } from '../types/sports';
const mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IUserProfile extends mongoose.Document {
  username: string;
  firstname: string;
  surname: string;
  fullname: string;
  country: string;
  bio: string;
  sports: SPORTS[];
  social_twitter: string;
  social_instagram: string;
  posts: mongoose.Schema.Types.ObjectId[];
  lines: mongoose.Schema.Types.ObjectId[];
  tracked_lines: mongoose.Schema.Types.ObjectId[];
  following: string[];
  followers: string[];
}

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    fullname: { type: String, required: true },
    country: { type: String, required: false },
    bio: { type: String, required: false },
    sports: [{ type: String, required: false }],
    social_twitter: { type: String, required: false },
    social_instagram: { type: String, required: false },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    lines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Line' }],
    tracked_lines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrackedLine' }],
    following: [{ type: String }],
    followers: [{ type: String }],
  },
  {
    usePushEach: true,
  }
);

schema.plugin(mongooseUniqueValidator);

const UserProfile = mongoose.model<IUserProfile>('UserProfile', schema);
export default UserProfile;
