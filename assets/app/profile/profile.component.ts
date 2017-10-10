import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

import { ProfileService } from "./profile.service";
import { Profile } from "./profile.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
    username: String;
    profile: Profile;

    constructor(private profileService: ProfileService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.username = params['user'];
            this.profileService.getProfile(this.username.toString())
                .subscribe(
                    (profile: Profile) => {
                        this.profile = profile;
                    }
                );
        });
    }

}