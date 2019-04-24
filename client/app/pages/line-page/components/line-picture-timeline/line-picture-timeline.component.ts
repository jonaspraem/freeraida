import { Component, Input, OnInit } from "@angular/core";
import { ILine, ILineLocation } from "../../../../models/interfaces/types";

@Component({
    selector: 'app-line-picture-timeline',
    templateUrl: './line-picture-timeline.component.html'
})

export class LinePictureTimelineComponent implements OnInit {
    @Input() line: ILine;
    public imageAttachedLocations: ILineLocation[];
    // TODO move to base model
    public startLocation: ILineLocation;
    public endLocation: ILineLocation;

    public ngOnInit(): void {
        this.imageAttachedLocations = this.line.locations.filter(loc => Array.isArray(loc.images));
        this.startLocation = this.line.locations[0];
        this.endLocation = this.line.locations[this.line.locations.length - 1];
        console.log(this.imageAttachedLocations);
    }

    public percentOnRoute(location: ILineLocation): number {
        return location.distanceFromStart / this.endLocation.distanceFromStart * 100;
    }

}