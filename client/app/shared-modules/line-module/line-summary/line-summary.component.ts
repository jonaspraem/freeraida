import { Component, Input } from "@angular/core";
import { ILine } from "../../../models/interfaces/types";
import { COLORS } from "../../../dictionary/colors";
import { COLOR_DICTIONARY } from "../../../dictionary/color-dictionary";

@Component({
    selector: 'app-line-summary',
    templateUrl: './line-summary.component.html'
})

export class LineSummaryComponent {
    @Input() line: ILine;
    public colors = COLORS;

    constructor(
        public COLOR_DICTIONARY: COLOR_DICTIONARY
    ) {}

}