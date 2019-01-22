import { Component, OnInit } from "@angular/core";
import { IUserProfile } from "../../models/interfaces/types";
import { ProfileService } from "../../core/services/profile.service";

@Component({
    selector: 'app-home-page',
    templateUrl: './home.page.component.html'
})

export class HomePageComponent implements OnInit {
    public userProfile: IUserProfile;

    constructor(
        private _profileService: ProfileService
    ) {}

    public ngOnInit(): void {
        this._profileService.userProfile$.subscribe(profile => {
            this.userProfile = profile;
        });
    }

}