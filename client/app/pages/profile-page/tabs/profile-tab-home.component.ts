import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { IPost, IProfileRelativeInfo, IUserProfile } from "../../../models/interfaces/types";
import { ProfilePageService } from "../profile-page.service";
import { PostService } from "../../../core/services/post.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-profile-tab-home',
    template: `
        <div class="width-container-flex">
            <div class="grid-left">
                <app-profile-info-card [userProfile]="userProfile"></app-profile-info-card>
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
        private _cdRef: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this._profilePageService.activeUserProfile$.subscribe(
            profile => {
                if (!!profile) {
                    this.userProfile = profile;
                    console.log("new profile from tab", this.userProfile);
                    this._cdRef.detectChanges();
                    this._subscriptions['feed'] = this._postService.getUserFeed(profile.username).subscribe(
                        feed => this.userFeed = feed);
                }
            });
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }
}