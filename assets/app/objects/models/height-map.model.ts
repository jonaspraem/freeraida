import { LineLocation } from "./line-location.model";
import { HeightMapObject } from "../interfaces/height-map-object.interface";

export class HeightMap {
    elevation: number;
    location: LineLocation;
    resolution: number;

    constructor(elevation: number, location: LineLocation, resolution: number) {
        this.elevation = elevation;
        this.location = location;
        this.resolution = resolution;
    }

    public static fabricate(object: HeightMapObject) {
        return new HeightMap(object.elevation, new LineLocation(object.location.lat, object.location.lng), object.resolution);
    }

    public static fabricateList(objects: HeightMapObject[]) {
        let list = [];
        for (let i = 0; i < objects.length; i++) {
            list.push(HeightMap.fabricate(objects[i]));
        }
        return list;
    }
}