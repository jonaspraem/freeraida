import { Component, Input } from "@angular/core";
import { LineTransferModel } from "./lineTransfer.model";
import { PolylineCoords } from "./path.model";
import { Profile } from "../profile/profile.model";
import { LineService } from "./line.service";
import { MapMarker } from "./mapmarker.model";

@Component({
    selector: 'app-user-line-history',
    templateUrl: './line-history.component.html',
    styleUrls: ['./line-history.component.css']
})

export class LineHistoryComponent {
    @Input() lines: LineTransferModel[];

    constructor(private lineService: LineService) {}

    // ngOnInit(): void {
    //     if (localStorage.getItem('username')) {
    //         this.lineService.getLines(localStorage.getItem('username'))
    //             .subscribe(
    //                 (lines: LineTransferModel[]) => {
    //                     this.lines = lines;
    //                     console.log('component info: '+JSON.stringify(this.lines));
    //                 }
    //             );
    //     }
    // }

    indexExists(index) : boolean {
        return (index != null);
    }

    getAverageLat(index) : number {
        let sum = 0;
        for (let m of index.markers) {
            sum += m.lat;
        }
        let average = sum/index.markers.length;
        return average;
    }

    getAverageLng(index) : number {
        let sum = 0;
        for (let m of index.markers) {
            sum += m.lng;
        }
        let average = sum/index.markers.length;
        return average;
    }

    getPolyCords(index) {
        let coordinates: PolylineCoords[] = [];
        let prev_lat;
        let prev_lng;
        for (let m of index.markers) {
            if (prev_lat && prev_lng) coordinates.push(new PolylineCoords(prev_lat, prev_lng, m.lat, m.lng));
            prev_lat = m.lat;
            prev_lng = m.lng;
        }
        return coordinates;
    }



}