import { Component, ElementRef } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Profile } from "../objects/models/profile.model";
import { ProfileService } from "../profile/profile.service";
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(profile_service, authService, _eref) {
        this.profile_service = profile_service;
        this.authService = authService;
        this._eref = _eref;
        this.isOpen = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.authService.userProfile) {
            this.userProfile = this.authService.userProfile;
        }
        else {
            this.authService.getProfile().subscribe(function (profile) {
                _this.userProfile = profile;
            });
        }
        this.profile_service.getProfileWithToken()
            .subscribe(function (data) {
            _this.profile = Profile.fabricate(data.obj);
        });
    };
    // On click outside component
    // On click outside component
    HeaderComponent.prototype.onClick = 
    // On click outside component
    function (event) {
        if (!this._eref.nativeElement.contains(event.target))
            // or some similar check
            this.onClose();
    };
    HeaderComponent.prototype.hasImage = function () {
        if (this.userProfile) {
            return (this.userProfile.picture);
        }
        return false;
    };
    HeaderComponent.prototype.isLoggedIn = function () {
        return this.authService.isAuthenticated();
    };
    HeaderComponent.prototype.onLogout = function () {
        this.authService.logout();
    };
    HeaderComponent.prototype.onOpen = function () {
        this.isOpen = true;
    };
    HeaderComponent.prototype.onClose = function () {
        this.isOpen = false;
    };
    HeaderComponent.prototype.onToggle = function () {
        this.isOpen = !this.isOpen;
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    host: {
                        '(document:click)': 'onClick($event)',
                    },
                    selector: 'app-header',
                    templateUrl: './header.component.html',
                    styleUrls: ['./header.component.css']
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: ProfileService, },
        { type: AuthService, },
        { type: ElementRef, },
    ]; };
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/header/header.component.js.map