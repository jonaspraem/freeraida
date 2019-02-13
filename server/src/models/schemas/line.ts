import * as mongoose from 'mongoose';
import { ILocation } from "./location";
const UserProfile = require('./user-profile');
const Location = require('./location');

export interface ILine extends mongoose.Document {
    name: string,
    username: string,
    type: string,
    locations: ILocation[],
    timestamp: Date
}

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    type: {type: String, required: true},
    locations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}],
    timestamp: {type: Date, required: true}
});

schema.pre('remove', async (next) => {
    const model = this;
    try {
        const locations = await Location.find({_id: {$in: model.markers}});
        locations.forEach((location) => {
            location.remove((err) => {});
        });
    } catch (e) {

    }
    try {
        const userProfile = await UserProfile.findOne({user_id: model.user_id});
        userProfile.lines.pull(model._id);
        userProfile.save();

    } catch (e) {

    }
    next();
});

const Line = mongoose.model<ILine>('Line', schema);
export default Line;