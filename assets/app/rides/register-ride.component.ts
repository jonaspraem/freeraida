import { Component, OnInit } from "@angular/core";
import { MapMarker } from "./mapmarker.model";
import { PolylineManager } from "@agm/core";

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

    constructor() {}

    ngOnInit(): void {
        this.mapType = 'satellite';
        this.markers = [];
    }

    mapClicked($event:any){
        console.log('Map Clicked');
        const marker: MapMarker = {
            name: 'Untitled',
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable:false
        };
        this.markers.push(marker);
        // add polyline
        // _polylineManager.addPolyline(line: AgmPolyline)

    }

    onMapTypeChange(val: string) {
        this.mapType = val;
    }

}