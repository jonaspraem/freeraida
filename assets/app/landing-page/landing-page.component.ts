import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
const image = require('../../images/350214-mountain-view.jpg');

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit{

    constructor(private router: Router) {}

    ngOnInit(): void {
        // if (!this.authService.isAuthenticated()) this.authService.login();
        // else this.router.navigate(['home'])
    }

}