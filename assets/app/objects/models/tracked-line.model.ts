import { LineLocation } from "./line-location.model";
import { TrackedLineObject } from "../interfaces/tracked-line-object.interface";
import { PostObject } from "../interfaces/post-object";
import { Post } from "./post.model";

export class TrackedLine {
    _id: string;
    locations: LineLocation[];

    constructor(_id: string, locations: LineLocation[]) {
        this._id = _id;
        this.locations = locations;
    }

    public static fabricate(object: TrackedLineObject): TrackedLine {
        let locations: LineLocation[] = [];
        for (let i = 0; i < object.locations.length; i++) {
            locations.push(new LineLocation(
                object.locations[i].time_at,
                object.locations[i].lat,
                object.locations[i].lng,
            ));
        }
        return new TrackedLine(object._id, locations);
    }

    public static fabricateList(objects: TrackedLineObject[]) : TrackedLine[] {
        let lines: TrackedLine[] = [];
        for (let i = 0; i < objects.length; i++) {
            for (let j = 0; j < objects[i].locations.length; j++) {
                let locations: LineLocation[] = [];
                locations.push(new LineLocation(
                    objects[i].locations[j].time_at,
                    objects[i].locations[j].lat,
                    objects[i].locations[j].lng,
                ));
            }
            lines.push(this.fabricate(objects[i]));
        }
        return lines;
    }
}