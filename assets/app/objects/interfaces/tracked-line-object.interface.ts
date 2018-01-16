import { LineLocationObject } from "./line-location-object.interface";

export interface TrackedLineObject {
    _id: string;
    locations: LineLocationObject[];
}