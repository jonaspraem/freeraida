import * as mongoose from 'mongoose';
import { ILocation } from './location';
const UserProfile = require('./user-profile');
const Location = require('./location');

export interface ILine extends mongoose.Document {
  name: string;
  username: string;
  sport: string;
  discipline: string;
  segments: ILineSegment[];
  timestamp: Date;
  peak: number;
  slope: number;
  startLocation?: ILocation;
  endLocation?: ILocation;
}

export interface ILineSegment {
  type: string;
  locations: ILocation[];
}

const lineSegmentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }],
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  sport: { type: String, required: true },
  discipline: { type: String, required: true },
  segments: { type: [lineSegmentSchema], required: true },
  timestamp: { type: Date, required: true },
  peak: { type: Number },
  slope: { type: Number },
});

schema.pre('remove', async function (next) {
  const model = this as any;
  try {
    const locationIds = Array.isArray(model.segments)
      ? model.segments.reduce((acc: any[], segment: any) => {
          if (Array.isArray(segment?.locations)) {
            return acc.concat(segment.locations);
          }
          return acc;
        }, [])
      : [];
    const locations = await Location.find({ _id: { $in: locationIds } });
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
