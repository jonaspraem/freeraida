import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
var WebAppComponent = /** @class */ (function () {
    function WebAppComponent(authService) {
        this.authService = authService;
    }
    WebAppComponent.prototype.ngOnInit = function () {
        this.authService.initUser();
    };
    WebAppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'web-app',
                    templateUrl: './webapp.component.html',
                    styleUrls: ['./webapp.component.css'],
                },] },
    ];
    /** @nocollapse */
    WebAppComponent.ctorParameters = function () { return [
        { type: AuthService, },
    ]; };
    return WebAppComponent;
}());
export { WebAppComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/webapp.component.js.map