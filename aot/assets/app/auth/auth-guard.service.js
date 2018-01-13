import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "./auth.service";
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(auth, router, route) {
        this.auth = auth;
        this.router = router;
        this.route = route;
    }
    AuthGuardService.prototype.canActivate = function () {
        if (!this.auth.isAuthenticated()) {
            return false;
        }
        return true;
    };
    AuthGuardService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthGuardService.ctorParameters = function () { return [
        { type: AuthService, },
        { type: Router, },
        { type: ActivatedRoute, },
    ]; };
    return AuthGuardService;
}());
export { AuthGuardService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/auth/auth-guard.service.js.map