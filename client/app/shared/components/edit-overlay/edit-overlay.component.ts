import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-overlay',
  templateUrl: './edit-overlay.component.html',
})
export class EditOverlayComponent {
  @Output() notifyEdit: EventEmitter<boolean> = new EventEmitter();
  @Output() saveEdit: EventEmitter<any> = new EventEmitter();

  public finishEdit(): void {
    this.saveEdit.emit();
  }

  public cancelEdit(): void {
    this.notifyEdit.emit(false);
  }
}
