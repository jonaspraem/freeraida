import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { Profile } from "./objects/models/profile.model";
import { ProfileService } from "./profile/profile.service";

@Component({
    selector: 'web-app',
    templateUrl: './webapp.component.html',
    styleUrls: ['./webapp.component.css'],
})

export class WebAppComponent implements OnInit {
    public userProfile: any;
    public profile: Profile;

    constructor(private auth_service: AuthService, private profile_service: ProfileService) {}

    ngOnInit(): void {
        this.auth_service.initUser();

        if (this.auth_service.userProfile) {
            this.userProfile = this.auth_service.userProfile;

        } else {
            this.auth_service.getProfile().subscribe(
                (profile: any) => {
                    this.userProfile = profile;
                }
            );
        }
        this.profile_service.getProfileWithToken()
            .subscribe(
                (data) => {
                    this.profile = Profile.fabricate(data.obj);
                }
            );
    }
}