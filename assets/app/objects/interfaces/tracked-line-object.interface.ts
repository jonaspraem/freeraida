import { LocationObject } from "./location-object.interface";

export interface TrackedLineObject {
    _id: string;
    user_id: string;
    locations: LocationObject[];
}