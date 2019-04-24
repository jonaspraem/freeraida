import { Component, Input } from "@angular/core";
import { ILine } from "../../../../models/interfaces/types";

@Component({
    selector: 'app-line-picture-timeline',
    templateUrl: './line-picture-timeline.component.html'
})

export class LinePictureTimelineComponent {
    @Input() line: ILine;
}