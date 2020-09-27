import * as mongoose from 'mongoose';
const UserProfile = require('./user-profile');

export interface IPost extends mongoose.Document {
  content: string;
  username: string;
  firstname: string;
  surname: string;
  fullname: string;
  timestamp: Date;
  gnarly: string[];
}

const schema = new mongoose.Schema({
  content: { type: String, required: true },
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  fullname: { type: String, required: true },
  timestamp: { type: Date, required: true },
  gnarly: [{ type: String }],
});

schema.pre('remove', async (next) => {
  try {
    const profile = await UserProfile.findById(this.username);
    profile.posts.pull(this._id);
    await profile.save();
    next();
  } catch (e) {}
});

const Post = mongoose.model<IPost>('Post', schema);
export default Post;
