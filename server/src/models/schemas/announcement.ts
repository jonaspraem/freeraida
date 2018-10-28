import * as mongoose from 'mongoose';
const UserProfile = require('./user-profile');

export interface IAnnouncement extends mongoose.Document {
    content: string,
    username: string,
    firstname: string,
    surname: string,
    fullname: string,
    timestamp: Date,
    gnarly: mongoose.Schema.Types.ObjectId[]
}

const schema = new mongoose.Schema({
    content: {type: String, required: true},
    username: {type: String, required: true},
    firstname: {type: String, required: true},
    surname: {type: String, required: true},
    fullname: {type: String, required: true},
    timestamp: {type: Date, required: true},
    gnarly: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'}]
});

schema.post('save', async () => {
    try {
        const profile = await UserProfile.findById(this.username);
        profile.announcements.push(this._id);
        await profile.save();
    } catch (e) {}
});

schema.pre('remove', async (next) => {
    try {
        const profile = await UserProfile.findById(this.username);
        profile.announcements.pull(this._id);
        await profile.save();
        next();
    } catch (e) {}
});

const Announcement = mongoose.model<IAnnouncement>('Announcement', schema);
export default Announcement;