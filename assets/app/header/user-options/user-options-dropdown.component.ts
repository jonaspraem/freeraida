import { Component, Input } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-user-options-dropdown',
    templateUrl: './user-options-dropdown.component.html',
    styleUrls: ['./user-options-dropdown.component.css']
})

export class UserOptionsDropdownComponent {
    @Input() profile: any;

    constructor(private authService: AuthService, private router: Router) {}

    hasImage(): boolean {
        if (this.profile) {
            return (this.profile.picture);
        }
        return false;
    }

    onLogout() {
        this.authService.logout();
    }

    onSettingsClick() {
        this.router.navigate(['home/settings']);
    }
}