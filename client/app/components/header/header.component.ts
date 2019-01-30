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
        '(document:click)': 'onOutsideClick($event)',
    },
    selector: 'app-header',
    templateUrl: './header.component.html',
})

export class HeaderComponent {
    @Input() userProfile: any;
    @Input() profile: Profile;
    public logo = logoImage;
    public defaultProfileImage = defaultProfileImage;
    public isUserMenuOpen: boolean = false;
    public isExpanded: boolean = true;
    private previousScrollPosition: number;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(WINDOW) private window,
        private _eref: ElementRef,
        public profileService: ProfileService
    ) {}

    // On click outside component
    onOutsideClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) this.onClose();
    }

    onOpen() {
        this.isUserMenuOpen = true;
    }

    onClose() {
        this.isUserMenuOpen = false;
    }

    onToggleUserMenu() {
        this.isUserMenuOpen = !this.isUserMenuOpen;
    }


}