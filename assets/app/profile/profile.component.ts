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
    profile: Profile;

    constructor(private profileService: ProfileService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            var username = params['user'];
            this.profileService.getProfile(username.toString())
                .subscribe(
                    (profile: Profile) => {
                        this.profile = profile;
                    }
                );
        });
    }

}