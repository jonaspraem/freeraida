import { Component } from "@angular/core";
import { Profile } from "./objects/models/profile.model";
import { ProfileService } from "./profile/profile.service";

@Component({
    selector: 'web-app',
    templateUrl: './webapp.component.html',
    styleUrls: ['./webapp.component.css'],
})

export class WebAppComponent {
    public userProfile: any;
    public profile: Profile;

    constructor(private profile_service: ProfileService) {}
}