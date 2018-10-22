import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Line } from "../../../../objects/models/line.model";
import { COLOR_DICTIONARY } from "../../../../../dictionary/color-dictionary";

@Component({
    selector: 'app-line-item',
    templateUrl: './line-item.component.html',
    styleUrls: ['./line-item.component.css']
})

export class LineItemComponent {
    @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
    @Input() line: Line;
    public isExpanded: boolean = false;

    constructor(public color_dictionary: COLOR_DICTIONARY) {}

    onDelete() {
        this.deleteEvent.emit(this.line._id);
    }

    onCollapse() {
        this.isExpanded = false;
    }

    onExpand() {
        this.isExpanded = true;
    }
}