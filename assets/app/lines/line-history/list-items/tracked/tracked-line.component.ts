import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TrackedLine } from "../../../../objects/models/tracked-line.model";
import { COLOR_DICTIONARY } from "../../../../dictionary/color-dictionary";
import { Router } from "@angular/router";

@Component({
    selector: 'app-tracked-line-item',
    templateUrl: './tracked-line.component.html',
    styleUrls: ['./tracked-line.component.css']
})

export class TrackedLineItemComponent {
    @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
    @Input() line: TrackedLine;
    public isExpanded: boolean = false;

    constructor(public color_dictionary: COLOR_DICTIONARY,
                private router: Router) {}

    onDelete() {
        this.deleteEvent.emit(this.line._id);
    }

    onEdit(id: string) {
        this.router.navigate(['home/tracked-line/'+id]);
    }

    onCollapse() {
        this.isExpanded = false;
    }

    onExpand() {
        this.isExpanded = true;
    }
}