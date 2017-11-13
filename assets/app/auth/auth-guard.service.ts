import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router, private route: ActivatedRoute) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            return false;
        }
        return true;
    }

}