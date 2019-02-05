import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "../../core/services/profile.service";
import { IUserProfile } from "../../models/interfaces/types";
import { IUserProfileResponse } from "../../models/interfaces/responses";
import { FLAG_DICTIONARY } from "../../dictionary/flag-dictionary";
import { SocialService } from "../../core/services/social.service";

const hero = require('../../../images/licensed/iStock-01.jpg');
const profile_image = require('../../../images/rider/profile-image.jpg');

export enum ProfileTab {
    POSTS = 0,
    REPUTATION = 1,
    LINES = 2,
    FOLLOWING = 3,
    FOLLOWERS = 4
}

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.page.component.html'
})

export class ProfilePageComponent implements OnInit, OnDestroy {
    public isSelf: boolean = false;
    public isFollowing: boolean;
    public profile: IUserProfile;
    public hero = hero;
    public profile_image = profile_image;
    public activeTab: ProfileTab = 0;
    private _subscriptionRoutes: Subscription;
    private _subscriptionProfile: Subscription;
    private _subscriptionSocial: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _profileService: ProfileService,
        private _socialService: SocialService
    ) {}

    public ngOnInit(): void {
        this._subscriptionRoutes = this._route.params.subscribe(params => {
            this._subscriptionProfile = this._profileService.getProfile(params.username).subscribe((data: IUserProfileResponse) => {
                this._profileService.userProfile$.subscribe( self => {
                    this.profile = data.obj;
                    if (this.profile.username === self.username) this.isSelf = true;
                    this.isFollowing = this._socialService.isFollowing(self, this.profile.username);
                });
            });
        });
    }

    public ngOnDestroy(): void {
        if (this._subscriptionRoutes) this._subscriptionRoutes.unsubscribe();
        if (this._subscriptionProfile) this._subscriptionProfile.unsubscribe();
        if (this._subscriptionSocial) this._subscriptionSocial.unsubscribe();
    }

    public getFlag(key: string): any {
        return FLAG_DICTIONARY.get(key);
    }

    public getFollowButtonText(): string {
        if (this.isFollowing) {
            return 'Following';
        }
        else {
            return 'Follow';
        }
    }

    public onToggleFollow(): void {
        if (this.isFollowing) {
            this._socialService.unfollowUser(this.profile.username).subscribe(
                (data: IUserProfileResponse) => {
                    this.profile = data.obj;
                    this.isFollowing = false;
                }
            );
        }
        else {
            this._socialService.followUser(this.profile.username).subscribe(
                (data: IUserProfileResponse) => {
                    this.profile = data.obj;
                    this.isFollowing = true;
                }
            );
        }
    }
}
