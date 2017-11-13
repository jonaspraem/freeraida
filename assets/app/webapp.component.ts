import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: 'web-app',
    templateUrl: './webapp.component.html',
    styleUrls: ['./webapp.component.css'],
})

export class WebAppComponent implements OnInit {

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.initUser();
    }
}