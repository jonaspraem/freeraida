import { LineLocation } from "./line-location.model";

export class UnregisteredLine {
    locations: LineLocation[];

    constructor(locations: LineLocation[]) {
        this.locations = locations;
    }
}