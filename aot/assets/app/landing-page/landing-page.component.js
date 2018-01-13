import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
var image = require('../../images/350214-mountain-view.jpg');
var LandingPageComponent = /** @class */ (function () {
    function LandingPageComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LandingPageComponent.prototype.ngOnInit = function () {
        if (!this.authService.isAuthenticated())
            this.authService.login();
        else
            this.router.navigate(['home']);
    };
    LandingPageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-landing-page',
                    templateUrl: './landing-page.component.html',
                    styleUrls: ['./landing-page.component.css']
                },] },
    ];
    /** @nocollapse */
    LandingPageComponent.ctorParameters = function () { return [
        { type: AuthService, },
        { type: Router, },
    ]; };
    return LandingPageComponent;
}());
export { LandingPageComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/landing-page/landing-page.component.js.map