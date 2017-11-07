import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NewAuthService } from "./new-auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: NewAuthService, public router: Router) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            console.log('navigate to landing-page');
            this.router.navigate(['/landing-page']);
            return false;
        }
        return true;
    }

}