import { Component, Input, OnInit } from "@angular/core";
import { ILine, IPolylineCoordinates } from "../../../models/interfaces/types";

@Component({
    selector: 'app-line-map',
    templateUrl: './line-map.component.html'
})

export class LineMapComponent implements OnInit {
    @Input() line: ILine;
    public polyCords: IPolylineCoordinates[];

    public ngOnInit(): void {
        this.updatePolyCords();
    }

    updatePolyCords() {
        let cords: IPolylineCoordinates[] = [];
        let prev_lat;
        let prev_lng;
        for (let loc of this.line.locations) {
            if (prev_lat && prev_lng) cords.push(
                {
                    org_lat: prev_lat,
                    org_lng: prev_lng,
                    destination_lat: loc.latitude,
                    destination_lng: loc.longitude
                });
            prev_lat = loc.latitude;
            prev_lng = loc.longitude;
        }
        this.polyCords =  cords;
    }
}