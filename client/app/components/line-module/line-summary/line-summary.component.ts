import { Component, Input } from "@angular/core";
import { ILine } from "../../../models/interfaces/types";

@Component({
    selector: 'app-line-summary',
    templateUrl: './line-summary.component.html'
})

export class LineSummaryComponent {
    @Input() line: ILine;
}