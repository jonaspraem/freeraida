import { Component, OnDestroy, OnInit } from "@angular/core";
import { LineService } from "../../../core/services/line.service";
import { ProfilePageService } from "../profile-page.service";
import { Subscription } from "rxjs";
import { ILine, IUserProfile } from "../../../models/interfaces/types";
import { IUserProfileResponse } from "../../../models/interfaces/responses";
import { SocialService } from "../../../core/services/social.service";

@Component({
    selector: 'app-profile-tab-line-history',
    template: `
        <div class="width-container">
            <app-line-summary *ngFor="let line of lineList" [line]="line"></app-line-summary>
        </div>
    `
})

export class ProfileTabLineHistoryComponent implements OnInit, OnDestroy {
    public lineList: ILine[] = [];
    public userProfile: IUserProfile;
    private _subscriptions: Subscription[] = [];

    constructor(
        private _profilePageService: ProfilePageService,
        private _lineService: LineService,
    ) {}

    public ngOnInit(): void {
        this._profilePageService.activeUserProfile$.subscribe(
            userProfile => {
                if (userProfile) {
                    this.userProfile = userProfile;
                    this._subscriptions['lines'] = this._lineService.getUserLines(userProfile.username)
                        .subscribe(
                            data => {
                                this.lineList = data.obj;
                            })
                }
            });
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }
}