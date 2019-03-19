import { Component, Input } from "@angular/core";
import { ILine } from "../../../../models/interfaces/types";

@Component({
    selector: 'app-line-overview',
    templateUrl: './line-overview.component.html'
})

export class LineOverviewComponent {
    @Input() line: ILine;
}