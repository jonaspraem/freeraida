import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { PolylineCoords } from "../../path.model";
import { TrackedLine } from "../../../objects/models/tracked-line.model";

@Component({
    selector: 'app-line-map-unregistered',
    templateUrl: './line-map-unregistered.component.html',
    styleUrls: ['./line-map-unregistered.component.css']
})

export class LineMapUnregisteredComponent implements OnInit {
    @Input() line: TrackedLine;
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
        for (let m of this.line.locations) {
            if (prev_lat && prev_lng) cords.push(new PolylineCoords(prev_lat, prev_lng, m.lat, m.lng));
            prev_lat = m.lat;
            prev_lng = m.lng;
        }
        this.polyCords =  cords;
        this.cdRef.detectChanges();
    }

    getAverageLat() {
        let lat = 0;
        for (let i = 0; i < this.line.locations.length; i++) {
            lat += this.line.locations[i].lat;
        }
        return lat / this.line.locations.length;
    }

    getAverageLng() {
        let lng = 0;
        for (let i = 0; i < this.line.locations.length; i++) {
            lng += this.line.locations[i].lng;
        }
        return lng / this.line.locations.length;
    }


}