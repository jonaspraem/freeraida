import { Component, Input, OnInit } from "@angular/core";
import { ILine, ILocation, IPolylineCoordinates } from "../../../models/interfaces/types";

@Component({
    selector: 'app-line-map',
    templateUrl: './line-map.component.html'
})

export class LineMapComponent implements OnInit {
    @Input() line: ILine;
    @Input() height: number;
    public polyCoords: IPolylineCoordinates[];
    public latitude: number;
    public longitude: number;
    public startLocation: ILocation;
    public endLocation: ILocation;

    public ngOnInit(): void {
        this.latitude = this.getAverageLat();
        this.longitude = this.getAverageLng();
        this.startLocation = this.line.locations[0];
        this.endLocation = this.line.locations[this.line.locations.length-1];
        this.updatePolyCords();
    }

    updatePolyCords() {
        let coords: IPolylineCoordinates[] = [];
        let prev_lat;
        let prev_lng;
        for (let loc of this.line.locations) {
            if (prev_lat && prev_lng) coords.push({
                org_lat: prev_lat,
                org_lng: prev_lng,
                destination_lat: loc.latitude,
                destination_lng: loc.longitude
            });
            prev_lat = loc.latitude;
            prev_lng = loc.longitude;
        }
        this.polyCoords =  coords;
    }

    getAverageLat() {
        let lat = 0;
        for (let loc of this.line.locations) {
            lat += loc.latitude;
        }
        return lat / this.line.locations.length;
    }

    getAverageLng() {
        let lng = 0;
        for (let loc of this.line.locations) {
            lng += loc.longitude;
        }
        return lng / this.line.locations.length;
    }
}