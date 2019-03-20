import { Component, Input } from "@angular/core";
import { ILine } from "../../../../models/interfaces/types";
import { COLOR_DICTIONARY } from "../../../../dictionary/color-dictionary";

@Component({
    selector: 'app-line-overview',
    templateUrl: './line-overview.component.html'
})

export class LineOverviewComponent {
    @Input() line: ILine;

    constructor(
        public colorDictionary: COLOR_DICTIONARY
    ) {}
}