export class LineLocation {
    lat: number;
    lng: number;
    elevation?: number;
    resolution?: number;

    constructor(lat: number, lng: number, elevation?: number, resolution?: number) {
        this.lat = lat;
        this.lng = lng;
        this.elevation = elevation;
        this.resolution = resolution;
    }
}