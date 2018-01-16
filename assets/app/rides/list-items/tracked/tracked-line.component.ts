import { Component, Input } from "@angular/core";
import { TrackedLine } from "../../../objects/models/tracked-line.model";

@Component({
    selector: 'app-tracked-line-item',
    templateUrl: './tracked-line.component.html',
    styleUrls: ['./tracked-line.component.css']
})

export class TrackedLineItemComponent {
    @Input() line: TrackedLine;
}