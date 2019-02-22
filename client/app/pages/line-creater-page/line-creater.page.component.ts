import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ILine, ILineLocation, ILocation } from "../../models/interfaces/types";
import { PolylineCoords } from "../../legacy/lines/path.model";
import { LineService } from "../../core/services/line.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-line-creator',
    templateUrl: './line-creator.page.component.html'
})

export class LineCreatorPageComponent implements OnInit{
    public line: ILineLocation[] = [];
    public polyCords: PolylineCoords[];
    public counter: number = 0;
    public registerForm = new FormGroup({
        lineName: new FormControl('', Validators.required),
        lineSport: new FormControl('', Validators.required),
        lineType: new FormControl('', Validators.required)
    });

    // TODO move - make enum
    public sportsTypes = [
        'Skiing',
        'Snowboarding',
        'Free climbing',
        'Mountaineering',
        'Mountain biking'
    ];
    public lineTypes = [
        'Trip',
        'Whole day',
        'Backcountry'
    ];

    constructor(
        private _lineService: LineService,
        private _cdRef: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.onFormChanges();
    }

    mapClicked($event:any) {
        // Ensure new object spawn
        const prevLocations: ILineLocation[] = Object.assign([], this.line);
        // Push new
        const location: ILineLocation = {
            latitude: $event.coords.lat,
            longitude: $event.coords.lng,
            elevation: 20,
            distanceFromStart: this.counter+=this.counter
        };
        prevLocations.push(location);
        this.line = prevLocations;
        this._cdRef.detectChanges();
        this.updateLine();
    }

    public updateLine() {
        this._lineService.getLineInfo(this.line).subscribe(
            (data) => {
                this.line = data.obj;
            });
        this.updatePolyCords();
    }

    updatePolyCords() {
        let cords: PolylineCoords[] = [];
        let prev_lat;
        let prev_lng;
        for (let loc of this.line) {
            if (prev_lat && prev_lng) cords.push(new PolylineCoords(prev_lat, prev_lng, loc.latitude, loc.longitude));
            prev_lat = loc.latitude;
            prev_lng = loc.longitude;
        }
        this.polyCords =  cords;
    }

    clickedMarker(loc: ILocation, index: number) {
        console.log('Clicked marker ', loc);
    }

    markerDragEnd(location: ILocation, index: number, $event: any) {
        this.line[index] = ({
            latitude: $event.coords.lat,
            longitude: $event.coords.lng
        });
        this.updateLine();
    }

    public onClear(): void {
        this.line = [];
        this.polyCords = [];
        this.registerForm.reset();
    }

    public onSubmit(): void {
        let line: ILine = ({
            name: this.registerForm.controls.lineName.value,
            sport: this.registerForm.controls.lineSport.value,
            discipline: this.registerForm.controls.lineType.value,
            locations: this.line
        });
        this._lineService.saveLine(line).subscribe((res) => {
            console.log(res);
            this.onClear();
        });
    }

    private onFormChanges() {
        this.registerForm.get('lineSport').valueChanges
            .subscribe(selectedSport => {
                if (selectedSport == '') {
                    this.registerForm.get('lineType').reset();
                    this.registerForm.get('lineType').disable();
                } else {
                    this.registerForm.get('lineType').enable();
                }
            });
    }
}