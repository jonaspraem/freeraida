import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { NewAuthService } from "../auth/new-auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    constructor(private authService: NewAuthService) {}

    isLoggedIn() {
        return this.authService.isAuthenticated();
    }

    onLogout() {
        this.authService.logout();
    }


}