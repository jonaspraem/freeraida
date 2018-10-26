import { LocationObject } from "./location-object.interface";

export interface HeightMapObject {
    elevation: number;
    location: LocationObject;
    resolution: number;
}