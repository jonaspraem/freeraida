import { Component, Input } from "@angular/core";
import { Line } from "../../objects/models/line.model";

@Component({
    selector: 'app-line-map',
    templateUrl: './line-map.component.html'
})

export class LineMapComponent {
    @Input() line: Line;
}