import { Component, OnInit } from "@angular/core";
import { NewAuthService } from "./auth/new-auth.service";

@Component({
    selector: 'web-app',
    templateUrl: './webapp.component.html',
    styleUrls: ['./webapp.component.css'],
})

export class WebAppComponent implements OnInit {

    constructor(private authService: NewAuthService) {}

    ngOnInit(): void {
        this.authService.initUser();
    }
}