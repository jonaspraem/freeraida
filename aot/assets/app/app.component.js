import { Component } from '@angular/core';
import { isDevMode } from '@angular/core';
import { AuthService } from "./auth/auth.service";
var AppComponent = /** @class */ (function () {
    function AppComponent(auth) {
        this.auth = auth;
        console.log(isDevMode());
        auth.handleAuthentication();
    }
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-root',
                    templateUrl: './app.component.html'
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return [
        { type: AuthService, },
    ]; };
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/app.component.js.map