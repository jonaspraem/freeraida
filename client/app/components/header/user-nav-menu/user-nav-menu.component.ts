import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IUserProfile } from "../../../models/interfaces/types";

@Component({
    selector: 'app-user-nav-menu',
    templateUrl: './user-nav-menu.component.html',
})

export class UserNavMenuComponent {
    @Input() userProfile: IUserProfile;
}