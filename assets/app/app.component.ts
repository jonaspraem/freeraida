import { Component } from '@angular/core';
import { isDevMode } from '@angular/core';
import { AuthService } from "./auth/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(public auth: AuthService) {
        console.log(isDevMode());
        auth.handleAuthentication();
    }

}
