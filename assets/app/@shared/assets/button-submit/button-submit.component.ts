import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-asset-button-submit',
    templateUrl: './button-submit.component.html',
    styleUrls: ['./button-submit.component.css']
})

export class AssetButtonSubmit {
    @Input() text: string;
    @Output() onClick = new EventEmitter();

    click() {
        this.onClick.emit();
    }
}