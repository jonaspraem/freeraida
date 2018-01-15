export class LineLocation {
    time_from_start: number;
    lat: number;
    lng: number;

    constructor(time_from_start: number, lat: number, lng: number) {
        this.time_from_start = time_from_start;
        this.lat = lat;
        this.lng = lng;
    }
}