import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { AuthService } from "./auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        const requiresLogin = route.data.requiresLogin || false;
        let url: string = state.url;
        if (requiresLogin) {
            return this.checkLogin(url);
        }
    }

    checkLogin(url: string): boolean {
        this.router.navigate(['/landing-page']);
        return false;
        // if (this.authService.isLoggedIn) { return true; }
        //
        // // Store the attempted URL for redirecting
        // this.authService.redirectUrl = url;
        //
        // // Navigate to the login page with extras
        // this.router.navigate(['/landing-page']);
        // return false;
    }
}