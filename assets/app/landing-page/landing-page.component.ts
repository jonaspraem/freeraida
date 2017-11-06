import { Component } from "@angular/core";
const image = require('../../images/350214-mountain-view.jpg');

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent {
    content: string = 'sign-in';

    isSignIn() {
        return (this.content == 'sign-in');
    }

    openSignIn() {
        this.content = 'sign-in';
    }

    openSignUp() {
        this.content = 'sign-up'
    }

}