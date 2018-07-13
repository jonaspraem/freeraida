import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-asset-button-submit-inverted',
    templateUrl: './button-submit-inverted.component.html',
    styleUrls: ['./button-submit-inverted.component.css']
})

export class AssetButtonSubmitInverted {
    @Input() text: string;
    @Output() onClick = new EventEmitter();

    click() {
        this.onClick.emit();
    }
}