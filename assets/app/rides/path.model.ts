export class PolylineCoords {
    org_lat: number;
    org_lng: number;
    destination_lat: number;
    destination_lng: number;


    constructor(org_lat: number, org_lng: number, destination_lat: number, destination_lng: number) {
        this.org_lat = org_lat;
        this.org_lng = org_lng;
        this.destination_lat = destination_lat;
        this.destination_lng = destination_lng;
    }
}