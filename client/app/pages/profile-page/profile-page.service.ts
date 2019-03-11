import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { IUserProfile } from "../../models/interfaces/types";
import { IUserProfileResponse } from "../../models/interfaces/responses";
import { ProfileService } from "../../core/services/profile.service";
import { SocialService } from "../../core/services/social.service";

@Injectable()

export class ProfilePageService implements OnDestroy {

    public isFollowing: boolean;
    public isSelf: boolean;
    private _activeUserProfile: BehaviorSubject<IUserProfile> = new BehaviorSubject<IUserProfile>(null);
    public activeUserProfile$: Observable<IUserProfile> = this._activeUserProfile.asObservable();
    private _subscriptions: Subscription[] = [];

    constructor(
        private _profileService: ProfileService,
        private _socialService: SocialService
    ) {}

    public ngOnDestroy(): void {
        this._subscriptions.forEach(sub => sub.unsubscribe());
    }

    public setActiveUsername(value: string): void {
        this._subscriptions['active-profile'] = this._profileService.getProfile(value).subscribe((data: IUserProfileResponse) => {
            console.log("profile", data.obj);
            this._activeUserProfile.next(data.obj);
            this._profileService.userProfile$.subscribe( self => {
                if (self) {
                    if (data.obj.username === self.username) this.isSelf = true;
                    this.isFollowing = this._socialService.isFollowing(self, data.obj.username);
                }
            });
        });
    }
}