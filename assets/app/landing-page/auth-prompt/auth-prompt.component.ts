import { Component } from "@angular/core";

const logoImage = require('../../../images/logo/favicon_kickstarter.png');

@Component({
    selector: 'app-auth-prompt',
    templateUrl: './auth-prompt.component.html',
    styleUrls: ['./auth-prompt.component.css']
})

export class AuthPromptComponent {
    public logo = logoImage;
    public enlistText = 'ENLIST NOW';

}