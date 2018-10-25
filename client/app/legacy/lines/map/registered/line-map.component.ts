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
    lat: number = 45.92375;
    lng: number = 6.86933;

    constructor(private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.lat = this.getAverageLat();
        this.lng = this.getAverageLng();
        this.mapType = 'hybrid';
        this.line.markers = this.line.markers.sort((n1,n2) => {
            if (n1.index > n2.index) return 1;
            if (n1.index < n2.index) return -1;
            return 0;
        });
        this.updatePolyCords();
    }

    updatePolyCords() {
        let cords: PolylineCoords[] = [];
        let prev_lat;
        let prev_lng;
        for (let m of this.line.markers) {
            if (prev_lat && prev_lng) cords.push(new PolylineCoords(prev_lat, prev_lng, m.location.lat, m.location.lng));
            prev_lat = m.location.lat;
            prev_lng = m.location.lng;
        }
        this.polyCords =  cords;
        this.cdRef.detectChanges();
    }

    getAverageLat() {
        let lat = 0;
        for (let i = 0; i < this.line.markers.length; i++) {
            lat += this.line.markers[i].location.lat;
        }
        return lat / this.line.markers.length;
    }

    getAverageLng() {
        let lng = 0;
        for (let i = 0; i < this.line.markers.length; i++) {
            lng += this.line.markers[i].location.lng;
        }
        return lng / this.line.markers.length;
    }


}