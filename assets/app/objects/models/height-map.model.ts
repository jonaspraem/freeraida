import { Location } from "./location.model";
import { HeightMapObject } from "../interfaces/height-map-object.interface";

export class HeightMap {
    elevation: number;
    location: Location;
    resolution: number;

    constructor(elevation: number, location: Location, resolution: number) {
        this.elevation = elevation;
        this.location = location;
        this.resolution = resolution;
    }

    public static fabricate(object: HeightMapObject) {
        console.log('fabrication of Heightmap'+ JSON.stringify(object));
        return new HeightMap(object.elevation, new Location(object.location.lat, object.location.lng), object.resolution);
    }

    public static fabricateList(objects: HeightMapObject[]) {
        let list = [];
        for (let i = 0; i < objects.length; i++) {
            list.push(HeightMap.fabricate(objects[i]));
        }
        return list;
    }
}