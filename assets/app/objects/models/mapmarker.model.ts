import { LineLocation } from "./line-location.model";
import { DistancePoint } from "./distance/distance-point.model";

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

    public static getScalingDistances(points: DistancePoint[]) {
        let object: number[] = [];
        let total = 0;
        for (let i = 0; i < points.length; i++) {
            total += points[i].distance;
            object.push(total);
        }
        return object;
    }
}