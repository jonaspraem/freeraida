import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-line-edit-overlay',
    templateUrl: './line-edit-overlay.component.html'
})

export class LineEditOverlayComponent {
    @Output() notifyEdit: EventEmitter<boolean> = new EventEmitter();

    public finishEdit(): void {
        // save
        this.notifyEdit.emit(false);
    }

    public cancelEdit(): void {
        this.notifyEdit.emit(false);
    }
}