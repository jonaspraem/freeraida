import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { NewAuthService } from "./new-auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: NewAuthService, public router: Router, private route: ActivatedRoute) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            console.log('navigate to landing-page');
            this.router.navigate(['landing-page']);
            return false;
        }
        console.log('authenticated');
        return true;
    }

}