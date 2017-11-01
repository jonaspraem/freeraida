import { Component } from "@angular/core";
import { GoogleSignInSuccess } from 'angular-google-signin';
import { GoogleAuthService } from "./google-auth.service";

@Component({
    selector: 'app-auth-sign-in',
    templateUrl: './google-sign-in.component.html'
})

export class GoogleAuthComponent {
    private myClientId: string = '372461699921-uv13me7jddkijchdsll7ttppmu8m5pjq.apps.googleusercontent.com';

    constructor(private googleAuthService: GoogleAuthService) {}

    onGoogleSignInSuccess(event: GoogleSignInSuccess) {
        let googleUser: gapi.auth2.GoogleUser = event.googleUser;
        let id: string = googleUser.getId();
        let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
        console.log('ID: ' +
            profile
                .getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        let id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        this.googleAuthService.verifyGoogleLogin(id_token);
    }

    onSignOut() {
        this.googleAuthService.signOut();
    }
}