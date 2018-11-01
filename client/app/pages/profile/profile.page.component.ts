import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "../../core/services/profile.service";
import { IUserProfile } from "../../models/interfaces/types";
import { IUserProfileResponse } from "../../models/interfaces/responses";
import { FLAG_DICTIONARY } from "../../dictionary/flag-dictionary";
import { SocialService } from "../../core/services/social.service";

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
    private _routeSubscription: Subscription;
    private _profileSubscription: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _profileService: ProfileService,
        private _socialService: SocialService
    ) {}

    public ngOnInit(): void {
        this._routeSubscription = this._route.params.subscribe(params => {
            this._profileSubscription = this._profileService.getProfile(params.username).subscribe((data: IUserProfileResponse) => {
                this.profile = data.obj; // TODO
                if (this.profile.username === this._profileService.userProfile.username) this.isSelf = true;
            });
        });
    }

    public ngOnDestroy(): void {
        if (this._routeSubscription) this._routeSubscription.unsubscribe();
        if (this._profileSubscription) this._profileSubscription.unsubscribe();
    }

    public getFlag(key: string): any {
        return FLAG_DICTIONARY.get(key);
    }

    public getFollowButtonText(): string {
        if (this._socialService.isFollowing(this._profileService.userProfile, this.profile.username)) {
            return 'Following';
        }
        else {
            return 'Follow';
        }
    }

    public onToggleFollow(): void {
        this._socialService.toggleFollow(this._profileService.userProfile, this.profile).subscribe(
            data => {
                this.profile = data.obj;
            }
        )
    }
}