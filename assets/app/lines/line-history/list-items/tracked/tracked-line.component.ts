import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TrackedLine } from "../../../../objects/models/tracked-line.model";
import { COLOR_DICTIONARY } from "../../../../dictionary/color-dictionary";

@Component({
    selector: 'app-tracked-line-item',
    templateUrl: './tracked-line.component.html',
    styleUrls: ['./tracked-line.component.css']
})

export class TrackedLineItemComponent {
    @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
    @Input() line: TrackedLine;
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