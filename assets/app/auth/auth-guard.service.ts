import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public router: Router, private route: ActivatedRoute) {}

    canActivate(): boolean {
        return true;
    }

}