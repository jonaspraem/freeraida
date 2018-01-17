import { LineLocation } from "../models/line-location.model";

export interface MarkerObject {
    index: number;
    name: string;
    location: LineLocation;
    distance_from_start?: number;
    time_from_start?: string;
}