import { Component, Input } from "@angular/core";
import { Line } from "../../../objects/models/line.model";
import { COLOR_DICTIONARY } from "../../../dictionary/color-dictionary";

@Component({
    selector: 'app-line-item',
    templateUrl: './line-item.component.html',
    styleUrls: ['./line-item.component.css']
})

export class LineItemComponent {
    @Input() line: Line;

    constructor(public color_dictionary: COLOR_DICTIONARY) {}
}