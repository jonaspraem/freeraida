import { Component, Input } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { Profile } from "../../objects/models/profile.model";
var UserOptionsDropdownComponent = /** @class */ (function () {
    function UserOptionsDropdownComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    UserOptionsDropdownComponent.prototype.hasImage = function () {
        if (this.userProfile) {
            return (this.userProfile.picture);
        }
        return false;
    };
    UserOptionsDropdownComponent.prototype.onLogout = function () {
        this.authService.logout();
    };
    UserOptionsDropdownComponent.prototype.onSettingsClick = function () {
        this.router.navigate(['home/settings']);
    };
    UserOptionsDropdownComponent.prototype.onProfileClick = function () {
        this.router.navigate(['home/user/' + this.profile.user_address]);
    };
    UserOptionsDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user-options-dropdown',
                    templateUrl: './user-options-dropdown.component.html',
                    styleUrls: ['./user-options-dropdown.component.css']
                },] },
    ];
    /** @nocollapse */
    UserOptionsDropdownComponent.ctorParameters = function () { return [
        { type: AuthService, },
        { type: Router, },
    ]; };
    UserOptionsDropdownComponent.propDecorators = {
        "userProfile": [{ type: Input },],
        "profile": [{ type: Input },],
    };
    return UserOptionsDropdownComponent;
}());
export { UserOptionsDropdownComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/header/user-options/user-options-dropdown.component.js.map