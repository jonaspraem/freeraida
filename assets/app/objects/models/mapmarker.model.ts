import { LineLocation } from "./line-location.model";

export class MapMarker {
    index: number;
    name: string;
    location: LineLocation;
    distance_from_start?: number;
    time_from_start?: string;

    constructor(index: number, name: string, location: LineLocation, distance_from_start?: number, time_from_start?: string) {
        this.index = index;
        this.name = name;
        this.location = location;
        this.distance_from_start = distance_from_start;
        this.time_from_start = time_from_start;
    }
}