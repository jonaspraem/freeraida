import { Component, OnInit } from "@angular/core";
import { NewAuthService } from "../auth/new-auth.service";

@Component({
    selector: 'app-auth0',
    templateUrl: './auth0.component.html'
})

export class Auth0Component implements OnInit {

    constructor(private newAuthService: NewAuthService) {}

    ngOnInit(): void {
        this.newAuthService.login();
    }

}