import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

const image = require('../../images/350214-mountain-view.jpg');

const logoImage = require('../../images/logo/favicon_kickstarter.png');
const backgroundImage = require('../../images/backgrounds/snow-3193865_1920.jpg');

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit {
    public logo = logoImage;
    public background = backgroundImage;

    constructor(private router: Router) {}

    ngOnInit(): void {
        // if (!this.authService.isAuthenticated()) this.authService.login();
        // else this.router.navigate(['home'])
    }

}