import { MapMarker } from "./mapmarker.model";

export class LineTransferModel {
    lineName: string;
    markers: MapMarker[];
    danger_level: string;
    tree_level: string;
    rock_level: string;
    cliff_level: string;


    constructor(lineName: string,
    markers: MapMarker[],
    danger_level: string,
    tree_level: string,
    rock_level: string,
    cliff_level: string,
                ) {
        this.lineName = lineName;
        this.markers = markers;
        this.danger_level = danger_level;
        this.tree_level = tree_level;
        this.rock_level = rock_level;
        this.cliff_level = cliff_level;
    }
}