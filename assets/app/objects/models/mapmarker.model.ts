export class MapMarker {
    name: string;
    lat: number;
    lng: number;

    constructor(name: string, lat: number, lng: number) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

    static fabricatePolyline(markers: MapMarker[]) {
        let polyline = '';
        for (let m of markers) {
            polyline+=m.lat+','+m.lng+'|';
        }
        return polyline.substring(0, polyline.length-2);
    }
}