import { Component, ElementRef, HostListener, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { NewAuthService } from "../auth/new-auth.service";

@Component({
    host: {
        '(document:click)': 'onClick($event)',
    },
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    profile: any;
    isOpen: boolean = false;

    constructor(private authService: NewAuthService, private _eref: ElementRef) {}

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

    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) // or some similar check
            this.onClose();
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

    onOpen() {
        this.isOpen = true;
    }

    onClose() {
        this.isOpen = false;
    }


}