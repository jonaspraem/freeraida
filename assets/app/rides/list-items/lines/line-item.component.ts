import { Component, Input } from "@angular/core";
import { Line } from "../../../objects/models/line.model";

@Component({
    selector: 'app-line-item',
    templateUrl: './line-item.component.html',
    styleUrls: ['./line-item.component.css']
})

export class LineItemComponent {
    @Input() line: Line;
}