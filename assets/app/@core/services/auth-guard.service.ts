import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {}

    canActivate(): boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/landing-page']);
            return false;
        }
        return true;
    }

}