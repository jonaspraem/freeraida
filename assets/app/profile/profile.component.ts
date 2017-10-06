import { Component, OnInit } from "@angular/core";
import { ProfileService } from "./profile.service";
import { Profile } from "./profile.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
    profile: Profile;

    constructor(private profileService: ProfileService) {}

    ngOnInit(): void {
        this.profileService.getProfile(localStorage.getItem('userId'))
            .subscribe(
                (profile: Profile) => {
                    this.profile = profile;
                }
            );
    }

}