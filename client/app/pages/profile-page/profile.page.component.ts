import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "../../core/services/profile.service";
import { ILine, IPost, IUserProfile } from "../../models/interfaces/types";
import { IUserProfileResponse } from "../../models/interfaces/responses";
import { FLAG_DICTIONARY } from "../../dictionary/flag-dictionary";
import { SocialService } from "../../core/services/social.service";
import { PostService } from "../../core/services/post.service";
import { LineService } from "../../core/services/line.service";
import { ProfilePageService } from "./profile-page.service";

const hero = require('../../../images/licensed/iStock-01.jpg');
const profile_image = require('../../../images/rider/profile-image.jpg');

export enum ProfileTab {
    FEED,
    REPUTATION,
    LINES,
    FOLLOWING,
    FOLLOWERS
}

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.page.component.html'
})

export class ProfilePageComponent implements OnInit, OnDestroy {
    public ProfileTab = ProfileTab;
    public isSelf: boolean = false;
    public isFollowing: boolean;
    public profile: IUserProfile;
    public hero = hero;
    public profile_image = profile_image;
    public activeTab: ProfileTab = ProfileTab.FEED;
    private _subscriptionRoutes: Subscription;
    private _subscriptionProfile: Subscription;
    private _subscriptionSocial: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _profileService: ProfileService,
        private _postService: PostService,
        private _socialService: SocialService,
        private _lineService: LineService,
        private _profilePageService: ProfilePageService,
        private _router: Router
    ) {}

    public ngOnInit(): void {
        this._subscriptionRoutes = this._route.params.subscribe(params => {
            this._profilePageService.setActiveUsername(params.username);
        });

        this._profileService.userProfile$.subscribe(profile => this.profile = profile);
    }

    public ngOnDestroy(): void {
        if (this._subscriptionRoutes) this._subscriptionRoutes.unsubscribe();
        if (this._subscriptionProfile) this._subscriptionProfile.unsubscribe();
        if (this._subscriptionSocial) this._subscriptionSocial.unsubscribe();
    }

    public onNavigate(tab: number): void {
        switch (tab) {
            case ProfileTab.FEED: {
                this._router.navigate(['user/' + this.profile.username + '/']);
                break;
            }
            case ProfileTab.LINES: {
                this._router.navigate(['user/' + this.profile.username + '/lines']);
                break;
            }
        }
    }
}
