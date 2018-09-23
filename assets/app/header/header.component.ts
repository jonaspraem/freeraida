import { Component, ElementRef, Input } from "@angular/core";
import { Profile } from "../objects/models/profile.model";

const logoImage = require('../../images/logo/favicon.png');

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
    public logo = logoImage;
    public isOpen: boolean = false;

    constructor(private _eref: ElementRef) {}

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
        // return this.authService.isAuthenticated();
    }

    onLogout() {
        // this.authService.logout();
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