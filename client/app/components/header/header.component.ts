import { Component, ElementRef, HostListener, Inject, Input } from "@angular/core";
import { Profile } from "../../legacy/objects/models/profile.model";
import { DOCUMENT, NgClass } from "@angular/common";
import { WINDOW } from "../../core/services/window.service";
import { AuthenticationService } from "../../core/services/authentication.service";
import { ProfileService } from "../../core/services/profile.service";

const logoImage = require('../../../images/logo/favicon.png');
const defaultProfileImage = require('../../../images/rider/profile-image.jpg');

@Component({
    host: {
        '(document:click)': 'onClick($event)',
    },
    selector: 'app-header',
    templateUrl: './header.component.html',
})

export class HeaderComponent {
    @Input() userProfile: any;
    @Input() profile: Profile;
    public logo = logoImage;
    public defaultProfileImage = defaultProfileImage;
    public isOpen: boolean = false;
    public isExpanded: boolean = true;
    private previousScrollPosition: number;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(WINDOW) private window,
        private _eref: ElementRef,
        private authService: AuthenticationService,
        public profileService: ProfileService
    ) {}

    @HostListener("window:scroll", [])
    onWindowScroll() {
        let scrollPosition = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        const isElasticScroll = this.previousScrollPosition < 0;
        this.isExpanded = !(scrollPosition > this.previousScrollPosition || isElasticScroll);
        this.previousScrollPosition = scrollPosition;
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