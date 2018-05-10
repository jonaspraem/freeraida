import { Component } from "@angular/core";

const logoImage = require('../../../images/logo/favicon_kickstarter.png');
const backgroundImage = require('../../../images/backgrounds/snow-3193865_1920.jpg');

@Component({
    selector: 'app-auth-prompt',
    templateUrl: './auth-prompt.component.html',
    styleUrls: ['./auth-prompt.component.css'],
})

export class AuthPromptComponent {
    public logo = logoImage;
    public background = backgroundImage;

}