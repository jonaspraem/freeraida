import { Component, ElementRef, HostListener, Input, OnInit } from "@angular/core";
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

export class HeaderComponent {
    @Input() userProfile: any;
    @Input() profile: Profile;
    public isOpen: boolean = false;

    constructor(private authService: AuthService,
                private _eref: ElementRef) {}

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