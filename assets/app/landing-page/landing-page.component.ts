import { Component, OnInit } from "@angular/core";
import { Router, Route } from "@angular/router";
import { AuthenticationService } from "../@core/services/authentication.service";
import { FLAG_DICTIONARY } from "../dictionary/flag-dictionary";

const image = require('../../images/350214-mountain-view.jpg');

const logoImage = require('../../images/logo/favicon.png');
const backgroundImage = require('../../images/backgrounds/snow-3193865_1920.jpg');

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    // styleUrls: ['../@styles/features/landing-page.scss']
})

export class LandingPageComponent implements OnInit {
    public logo = logoImage;
    public background = backgroundImage;
    public countryList;

    constructor(private router: Router, private authService: AuthenticationService) {}

    ngOnInit(): void {
        this.countryList = FLAG_DICTIONARY.toList();
        console.log(this.countryList)
    }

    onGoogle() {
    }

}