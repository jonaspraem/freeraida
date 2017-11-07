import { Component } from '@angular/core';
import { NewAuthService } from "./auth/new-auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(public auth: NewAuthService) {
        auth.handleAuthentication();
    }

}
