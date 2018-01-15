import { LineLocation } from "./line-location.model";

export class TrackedLine {
    locations: LineLocation[];

    constructor(locations: LineLocation[]) {
        this.locations = locations;
    }
}