import * as mongoose from 'mongoose';
import { ILocation } from './location';
const UserProfile = require('./user-profile');
const Location = require('./location');

export interface ILine extends mongoose.Document {
  name: string;
  username: string;
  sport: string;
  discipline: string;
  locations: ILocation[];
  timestamp: Date;
  peak: number;
  slope: number;
  startLocation?: ILocation;
  endLocation?: ILocation;
}

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  sport: { type: String, required: true },
  discipline: { type: String, required: true },
  locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }],
  timestamp: { type: Date, required: true },
  peak: { type: Number },
  slope: { type: Number },
});

schema.pre('remove', async function (next) {
  const model = this as any;
  try {
    const locations = await Location.find({ _id: { $in: model.markers } });
    locations.forEach((location) => {
      location.remove((err) => {});
    });
  } catch (e) {}
  try {
    const userProfile = await UserProfile.findOne({ user_id: model.user_id });
    if (userProfile) {
      userProfile.lines.pull(model._id);
      userProfile.save();
    }
  } catch (e) {}
  next();
});

const Line = mongoose.model<ILine>('Line', schema);
export default Line;
