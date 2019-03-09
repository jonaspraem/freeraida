import * as mongoose from 'mongoose';

export interface ILocation extends mongoose.Document {
    latitude: number,
    longitude: number,
    elevation: number,
    lineIndex: number,
    timeFromStart: string,
    timeFromLast: string,
    distanceFromStart: number,
    distanceFromLast: number
}

const schema = new mongoose.Schema({
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    elevation: {type: Number, required: true},
    lineIndex: {type: Number},
    timeFromStart: {type: String},
    timeFromLast: {type: String},
    distanceFromStart: {type: Number},
    distanceFromLast: {type: Number}
});

const Location = mongoose.model<ILocation>('Location', schema);
export default Location;