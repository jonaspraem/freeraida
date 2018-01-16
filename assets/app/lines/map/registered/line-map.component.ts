import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { Line } from "../../../objects/models/line.model";
import { PolylineCoords } from "../../path.model";

import { AgmMap } from '@agm/core';

@Component({
    selector: 'app-line-map',
    templateUrl: './line-map.component.html',
    styleUrls: ['./line-map.component.css']
})

export class LineMapComponent implements OnInit {
    @Input() line: Line;
    public polyCords: PolylineCoords[];
    mapType: string;
    lat: number = 51.678418;
    lng: number = 7.809007;

    constructor(private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.lat = this.getAverageLat();
        this.lng = this.getAverageLng();
        this.mapType = 'hybrid';
        this.updatePolyCords();
    }

    updatePolyCords() {
        let cords: PolylineCoords[] = [];
        let prev_lat;
        let prev_lng;
        for (let m of this.line.markers) {
            if (prev_lat && prev_lng) cords.push(new PolylineCoords(prev_lat, prev_lng, m.lat, m.lng));
            prev_lat = m.lat;
            prev_lng = m.lng;
        }
        this.polyCords =  cords;
        this.cdRef.detectChanges();
    }

    getAverageLat() {
        let lat = 0;
        for (let i = 0; i < this.line.markers.length; i++) {
            lat += this.line.markers[i].lat;
        }
        return lat / this.line.markers.length;
    }

    getAverageLng() {
        let lng = 0;
        for (let i = 0; i < this.line.markers.length; i++) {
            lng += this.line.markers[i].lng;
        }
        return lng / this.line.markers.length;
    }


}