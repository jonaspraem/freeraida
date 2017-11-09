import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-user-options-dropdown',
    templateUrl: './user-options-dropdown.component.html',
    styleUrls: ['./user-options-dropdown.component.css']
})

export class UserOptionsDropdownComponent {
    @Input() profile: any;

    hasImage(): boolean {
        if (this.profile) {
            return (this.profile.picture);
        }
        return false;
    }
}