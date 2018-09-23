import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-asset-button-cancel',
    templateUrl: './button-cancel.component.html',
    styleUrls: ['./button-cancel.component.css']
})

export class AssetButtonCancel {
    @Input() text: string;
    @Output() onClick = new EventEmitter();

    click() {
        this.onClick.emit();
    }
}