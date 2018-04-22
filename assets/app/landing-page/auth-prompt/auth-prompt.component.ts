import { Component } from "@angular/core";
import { Animations } from "../../@shared/animations/animations";

const logoImage = require('../../../images/logo/favicon_kickstarter.png');

@Component({
    selector: 'app-auth-prompt',
    templateUrl: './auth-prompt.component.html',
    styleUrls: ['./auth-prompt.component.css'],
    animations: [Animations.slideUpDown]
})

export class AuthPromptComponent {
    public logo = logoImage;
    public enlistText = 'ENLIST NOW';
    public isEnlistFormOpen = false;

    onEnlist() {
        this.isEnlistFormOpen = true;
    }

}