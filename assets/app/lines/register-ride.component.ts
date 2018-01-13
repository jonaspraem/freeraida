import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MapMarker } from "./mapmarker.model";
import { PolylineCoords } from "./path.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LineTransferModel } from "./lineTransfer.model";
import { LineService } from "./line.service";
import { FLAG_DICTIONARY } from "../dictionary/flag-dictionary";

@Component({
    selector: 'app-register-ride',
    templateUrl: './register-ride.component.html',
    styleUrls: ['./register-ride.component.css']
})

export class RegisterRideComponent implements OnInit{
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

    constructor(private cdRef: ChangeDetectorRef, private lineService: LineService, private flagMap: FLAG_DICTIONARY) {}

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
        const lineTransfer = new LineTransferModel(this.lineForm.value.lineName, this.markers, this.danger_level, this.tree_level, this.rock_level, this.cliff_level);
        // check for data
        if (lineTransfer.lineName &&
            lineTransfer.markers.length > 1 &&
            lineTransfer.danger_level &&
            lineTransfer.tree_level &&
            lineTransfer.rock_level &&
            lineTransfer.cliff_level) {
            // submit
            // this.lineService.addLine(lineTransfer).subscribe(
            //     (line: LineTransferModel) => {
            //         console.log(line);
            //     });
        }
        // TODO: make better error message
        else {
            console.log('cant submit');
        }
    }
}