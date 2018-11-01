import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "../../core/services/profile.service";
import { IUserProfile } from "../../models/interfaces/types";
import { IUserProfileResponse } from "../../models/interfaces/responses";
import { FLAG_DICTIONARY } from "../../dictionary/flag-dictionary";

const hero = require('../../../images/licensed/iStock-01.jpg');
const profile_image = require('../../../images/rider/profile-image.jpg');

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.page.component.html'
})

export class ProfilePageComponent implements OnInit, OnDestroy {
    public isSelf: boolean = false;
    public profile: IUserProfile;
    public hero = hero;
    public profile_image = profile_image;
    private route_subscription: Subscription;
    private profile_subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private profile_service: ProfileService
    ) {}

    public ngOnInit(): void {
        this.route_subscription = this.route.params.subscribe(params => {
            this.profile_subscription = this.profile_service.getProfile(params.username).subscribe((data: IUserProfileResponse) => {
                this.profile = data.obj; // TODO
                if (this.profile.username === this.profile_service.userProfile.username) this.isSelf = true;
            });
        });
    }

    public ngOnDestroy(): void {
        if (this.route_subscription) this.route_subscription.unsubscribe();
        if (this.profile_subscription) this.profile_subscription.unsubscribe();
    }

    public getFlag(key: string) {
        return FLAG_DICTIONARY.get(key);
    }
}