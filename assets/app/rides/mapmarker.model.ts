export class MapMarker {
    name: string;
    lat: number;
    lng: number;
    draggable: boolean;


    constructor(name: string, lat: number, lng: number, draggable?: boolean) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.draggable = (draggable) ? draggable : true;
    }
}