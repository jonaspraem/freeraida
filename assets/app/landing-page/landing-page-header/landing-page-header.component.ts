import { Component } from "@angular/core";

const logoImage = require('../../../images/logo/favicon.png');

@Component({
    selector: 'app-landing-page-header',
    templateUrl: './landing-page-header.component.html',
    styleUrls: ['./landing-page-header.component.css']
})

export class LandingPageHeaderComponent {
    public logo = logoImage;

}