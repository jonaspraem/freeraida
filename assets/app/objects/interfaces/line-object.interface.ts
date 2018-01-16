import { MarkerObject } from "./marker-object.interface";

export interface LineObject {
    _id: string;
    lineName: string;
    line_type: string;
    timestamp: Date;
    markers: MarkerObject[];
    danger_level: string;
    tree_level: string;
    rock_level: string;
    cliff_level: string;
}