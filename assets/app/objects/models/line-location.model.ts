export class LineLocation {
    time_at: string;
    lat: number;
    lng: number;

    constructor(time_at: string, lat: number, lng: number) {
        this.time_at = time_at;
        this.lat = lat;
        this.lng = lng;
    }
}