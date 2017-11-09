import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { NewAuthService } from "../auth/new-auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    profile: any;

    constructor(private authService: NewAuthService) {}

    ngOnInit(): void {
        if (this.authService.userProfile) {
            this.profile = this.authService.userProfile;
            console.log('profile '+this.profile);
        } else {
            this.authService.getProfile().subscribe(
                (profile: any) => {
                    this.profile = profile;
                    console.log('profile '+this.profile.toString());
                }
            );
        }

    }

    hasImage(): boolean {
        if (this.profile) {
            return (this.profile.picture);
        }
        return false;
    }

    isLoggedIn() {
        return this.authService.isAuthenticated();
    }

    onLogout() {
        this.authService.logout();
    }


}