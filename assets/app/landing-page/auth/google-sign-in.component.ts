import { Component } from "@angular/core";
import { GoogleSignInSuccess } from 'angular-google-signin';

@Component({
    selector: 'app-auth-sign-in',
    templateUrl: './google-sign-in.component.html'
})

export class GoogleAuthComponent {
    private myClientId: string = '372461699921-uv13me7jddkijchdsll7ttppmu8m5pjq.apps.googleusercontent.com';

    onGoogleSignInSuccess(event: GoogleSignInSuccess) {
        let googleUser: gapi.auth2.GoogleUser = event.googleUser;
        let id: string = googleUser.getId();
        let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
        console.log('ID: ' +
            profile
                .getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
    }
}