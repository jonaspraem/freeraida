import { Component, Input } from "@angular/core";
import { NewAuthService } from "../../auth/new-auth.service";

@Component({
    selector: 'app-user-options-dropdown',
    templateUrl: './user-options-dropdown.component.html',
    styleUrls: ['./user-options-dropdown.component.css']
})

export class UserOptionsDropdownComponent {
    @Input() profile: any;

    constructor(private authService: NewAuthService) {}

    hasImage(): boolean {
        if (this.profile) {
            return (this.profile.picture);
        }
        return false;
    }

    onLogout() {
        this.authService.logout();
    }
}