import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { MapMarker } from "../objects/models/mapmarker.model";
import { PolylineCoords } from "./path.model";
import { LineService } from "./line.service";
import { Line } from "../objects/models/line.model";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";

@Component({
    selector: 'app-register-line',
    providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
    templateUrl: './register-line.component.html',
    styleUrls: ['./register-line.component.css']
})

export class RegisterLineComponent implements OnInit {
    // User Inputs
    selectedLineType: string;

    location = {};
    lat: number = 51.678418;
    lng: number = 7.809007;
    mapType: string;
    polyCords: PolylineCoords[];

    // Form values
    lineForm: FormGroup;
    markers: MapMarker[];
    lineName: string;
    danger_level: string;
    tree_level: string;
    rock_level: string;
    cliff_level: string;


    constructor(public color_dictionary: COLOR_DICTIONARY,
                private cdRef: ChangeDetectorRef,
                private lineService: LineService,
                location: Location
    ) {
        this.location = location;
    }

    ngOnInit(): void {
        this.mapType = 'hybrid';
        this.markers = [];

        this.lineForm = new FormGroup({
            lineName: new FormControl(null, Validators.required),
            danger_level: new FormControl(null, Validators.required),
            tree_level: new FormControl(null, Validators.required),
            rock_level: new FormControl(null, Validators.required),
            cliff_level: new FormControl(null, Validators.required),
            markers: new FormControl(null, Validators.min(2))
        });

        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            // in your case
            this.location = position.coords;
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
        });
    }

    getLineType() {
        if (this.selectedLineType == 'Climb') return 'ascent';
        else if (this.selectedLineType == 'Backcountry') return 'descent';
        else if (this.selectedLineType == 'Tour') return 'tour';
        else return 'black';
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
        this.polyCords =  cords;
        this.cdRef.detectChanges();
    }

    mapClicked($event:any){
        const marker: MapMarker = {
            name: 'Point '+(this.markers.length + 1),
            lat: $event.coords.lat,
            lng: $event.coords.lng
        };
        this.markers.push(marker);
        this.updatePolyCords();
        this.lineService.getHeightMap(this.markers).subscribe(data => console.log(data));
        this.lineService.getDistance(this.markers).subscribe(data => console.log(data));
    }

    clickedMarker(marker:MapMarker, index:number) {
        console.log('Clicked marker '+marker.name+' at index '+index);
    }

    markerDragEnd(marker:any, $event:any) {
        for (let m of this.markers) {
            if (m.name == marker.name) {
                m.lat = $event.coords.lat;
                m.lng = $event.coords.lng;
            }
        }
        this.updatePolyCords();
    }

    removeMarker(marker) {
        for (let i = 0; i < this.markers.length; i++) {
            if (this.markers[i].lat == marker.lat && this.markers[i].lng == marker.lng) {
                this.markers.splice(i, 1);
            }
        }
        this.updatePolyCords();
    }

    markerDeleteLast() {
        this.markers.splice(this.markers.length-1, 1);
        this.updatePolyCords();
    }

    markerDeleteAll() {
        this.markers = [];
        this.updatePolyCords();
    }

    onSubmit() {
        const lineTransfer = new Line(this.lineForm.value.lineName, new Date(), this.markers, this.danger_level, this.tree_level, this.rock_level, this.cliff_level);
        // check for data
        if (lineTransfer.lineName &&
            lineTransfer.markers.length > 1 &&
            lineTransfer.danger_level &&
            lineTransfer.tree_level &&
            lineTransfer.rock_level &&
            lineTransfer.cliff_level) {
            // submit
            this.lineService.addLine(lineTransfer).subscribe(
                (line: Line) => {
                    console.log(line);
                });
        }
        // TODO: make better error message
        else {
            console.log('cant submit');
        }
    }
}