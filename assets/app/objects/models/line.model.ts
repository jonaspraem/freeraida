import { MapMarker } from "./mapmarker.model";
import { LineObject } from "../interfaces/line-object.interface";

export class Line {
    lineName: string;
    timestamp: Date;
    line_type: string;
    markers: MapMarker[];
    danger_level: string;
    tree_level: string;
    rock_level: string;
    cliff_level: string;


    constructor(lineName: string,
    line_type: string,
    timestamp: Date,
    markers: MapMarker[],
    danger_level: string,
    tree_level: string,
    rock_level: string,
    cliff_level: string,
                ) {
        this.lineName = lineName;
        this.line_type = line_type;
        this.timestamp = timestamp;
        this.markers = markers;
        this.danger_level = danger_level;
        this.tree_level = tree_level;
        this.rock_level = rock_level;
        this.cliff_level = cliff_level;
    }

    public static fabricate(object: LineObject): Line {
        return new Line(
            object.lineName,
            object.line_type,
            new Date(object.timestamp),
            object.markers,
            object.danger_level,
            object.tree_level,
            object.rock_level,
            object.cliff_level
        );
    }

    public static fabricateList(objects: LineObject[]) : Line[] {
        let lines: Line[] = [];
        for (let i = 0; i < objects.length; i++) {
            lines.push(this.fabricate(objects[i]));
        }
        return lines;
    }
}