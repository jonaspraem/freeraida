import { Component, Input, OnDestroy } from "@angular/core";
import { IPost, IUserProfile } from "../../../models/interfaces/types";
import { IUserProfileResponse } from "../../../models/interfaces/responses";
import { ProfilePageService } from "../profile-page.service";
import { PostService } from "../../../core/services/post.service";
import { Subscription } from "rxjs";
import { ProfileService } from "../../../core/services/profile.service";

@Component({
    selector: 'app-profile-tab-home',
    template: `
        <div class="width-container-flex">
            <div class="grid-left">
                <app-profile-info-card [userProfile]="userProfile" [isFollowing]="isFollowing()"></app-profile-info-card>
            </div>
            <div class="grid-main">
                <app-post *ngFor="let post of userFeed"
                          [postModel]="post"></app-post>
            </div>
            <div class="grid-right">
            </div>
        </div>
    `
})

export class ProfileTabHomeComponent implements OnDestroy {
    public userProfile: IUserProfile;
    public userFeed: IPost[] = [];
    private _subscriptions: Subscription[] = [];

    constructor(
        private _profilePageService: ProfilePageService,
        private _postService: PostService,
    ) {}

    public ngOnInit(): void {
        this._profilePageService.activeUserProfile$.subscribe(
            profile => {
                console.log("reci profile", profile);
                if (!!profile) {
                    this.userProfile = profile;
                    this._subscriptions['feed'] = this._postService.getUserFeed(profile.username).subscribe(
                        data => {
                            this.userFeed = data.obj
                        });
                }
            });
    }

    public isFollowing(): boolean {
        return this._profilePageService.isFollowing;
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }
}