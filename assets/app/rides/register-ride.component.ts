import { Component, OnInit, QueryList } from "@angular/core";
import { MapMarker } from "./mapmarker.model";
import { PolylineCoords } from "./path.model";

@Component({
    selector: 'app-register-ride',
    templateUrl: './register-ride.component.html',
    styleUrls: ['./register-ride.component.css']
})

export class RegisterRideComponent implements OnInit{
    title: string = 'Rides';
    lat: number = 51.678418;
    lng: number = 7.809007;
    mapType: string;
    markers: MapMarker[];
    polyCords: PolylineCoords[];

    constructor() {}

    ngOnInit(): void {
        this.mapType = 'satellite';
        this.markers = [];
    }

    updatePolyCords() {
        let cords: PolylineCoords[] = [];
        let prev_lat;
        let prev_lng;
        for (let m of this.markers) {
            if (prev_lat && prev_lng) cords.push(new PolylineCoords(prev_lat, prev_lng, m.lat, m.lng));
            prev_lat = m.lat;
            prev_lng = m.lng;
        }
        console.log(cords);
        this.polyCords =  cords;
    }

    mapClicked($event:any){
        console.log('Map Clicked');
        const marker: MapMarker = {
            name: 'Point '+(this.markers.length + 1),
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        };
        this.markers.push(marker);
        this.updatePolyCords();
        // add polyline
        // _polylineManager.addPolyline(line: AgmPolyline)

    }

}