import { Component, ElementRef, HostListener, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Profile } from "../objects/models/profile.model";
import { ProfileService } from "../profile/profile.service";

@Component({
    host: {
        '(document:click)': 'onClick($event)',
    },
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    public userProfile: any;
    public profile: Profile;
    public isOpen: boolean = false;

    constructor(private profile_service: ProfileService,
                private authService: AuthService,
                private _eref: ElementRef) {}

    ngOnInit(): void {
        if (this.authService.userProfile) {
            this.userProfile = this.authService.userProfile;

        } else {
            this.authService.getProfile().subscribe(
                (profile: any) => {
                    this.userProfile = profile;
                }
            );
        }
        this.profile_service.getProfileWithToken()
            .subscribe(
            (data) => {
                this.profile = Profile.fabricate(data.obj);
            }
        );

    }

    // On click outside component
    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) this.onClose();
    }

    hasImage(): boolean {
        if (this.userProfile) {
            return (this.userProfile.picture);
        }
        return false;
    }

    isLoggedIn() {
        return this.authService.isAuthenticated();
    }

    onLogout() {
        this.authService.logout();
    }

    onOpen() {
        this.isOpen = true;
    }

    onClose() {
        this.isOpen = false;
    }

    onToggle() {
        this.isOpen = !this.isOpen;
    }


}