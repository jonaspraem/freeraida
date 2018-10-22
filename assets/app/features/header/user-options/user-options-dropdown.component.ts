import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Profile } from "../../../legacy/objects/models/profile.model";

@Component({
    selector: 'app-user-options-dropdown',
    templateUrl: './user-options-dropdown.component.html',
    styleUrls: ['./user-options-dropdown.component.css']
})

export class UserOptionsDropdownComponent {
    @Input() userProfile: any;
    @Input() profile: Profile;

    constructor(private router: Router) {}

    hasImage(): boolean {
        if (this.userProfile) {
            return (this.userProfile.picture);
        }
        return false;
    }

    onLogout() {
        // this.authService.logout();
    }

    onSettingsClick() {
        this.router.navigate(['home/settings']);
    }

    onProfileClick() {
        this.router.navigate(['home/user/'+this.profile.user_address]);
    }
}