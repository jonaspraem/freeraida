import { LineLocation } from "./line-location.model";
import { TrackedLineObject } from "../interfaces/tracked-line-object.interface";
import { PostObject } from "../interfaces/post-object";
import { Post } from "./post.model";

export class TrackedLine {
    _id: string;
    user_id: string;
    locations: LineLocation[];

    constructor(_id: string, user_id: string, locations: LineLocation[]) {
        this._id = _id;
        this.user_id = user_id;
        this.locations = locations;
    }

    public static fabricate(object: TrackedLineObject): TrackedLine {
        let locations: LineLocation[] = [];
        for (let i = 0; i < object.locations.length; i++) {
            locations.push(new LineLocation(
                object.locations[i].lat,
                object.locations[i].lng,
            ));
        }
        let trackedLine = new TrackedLine(object._id, object.user_id, locations);
        console.log('fabrication single line: '+JSON.stringify(trackedLine));
        return trackedLine;
    }

    public static fabricateList(objects: TrackedLineObject[]): TrackedLine[] {
        console.log('fabrication: '+JSON.stringify(objects));
        let lines: TrackedLine[] = [];
        for (let i = 0; i < objects.length; i++) {
            lines.push(this.fabricate(objects[i]));
        }
        console.log('fabrication lines: '+JSON.stringify(lines));
        return lines;
    }
}