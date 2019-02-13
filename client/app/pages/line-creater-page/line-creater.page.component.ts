import { ChangeDetectorRef, Component } from "@angular/core";
import { ILineLocation, ILocation } from "../../models/interfaces/types";
import { PolylineCoords } from "../../legacy/lines/path.model";

@Component({
    selector: 'app-line-creator',
    templateUrl: './line-creator.page.component.html'
})

export class LineCreatorPageComponent {
    public line: ILineLocation[] = [
        {
            latitude: 5,
            longitude: 12
        },
        {
            latitude: 9,
            longitude: 3
        },
        {
            latitude: 6,
            longitude: 5
        }
    ];
    polyCords: PolylineCoords[];
    public counter: number = 1;

    constructor(
        private _cdRef: ChangeDetectorRef
    ) {}

    mapClicked($event:any) {
        const location: ILineLocation = {
            latitude: $event.coords.lat,
            longitude: $event.coords.lng,
            elevation: 20,
            distanceFromStart: this.counter+=this.counter
        };
        this.line.push(location);
        this._cdRef.detectChanges();
        // console.log(this.line);
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