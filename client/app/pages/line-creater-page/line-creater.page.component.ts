import { ChangeDetectorRef, Component } from "@angular/core";
import { ILineLocation, ILocation } from "../../models/interfaces/types";
import { PolylineCoords } from "../../legacy/lines/path.model";
import { LineService } from "../../core/services/line.service";

@Component({
    selector: 'app-line-creator',
    templateUrl: './line-creator.page.component.html'
})

export class LineCreatorPageComponent {
    public line: ILineLocation[] = [];
    polyCords: PolylineCoords[];
    public counter: number = 1;

    constructor(
        private _lineService: LineService,
        private _cdRef: ChangeDetectorRef
    ) {}

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
        // console.log(this.line);
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
        this.updatePolyCords();
    }
}