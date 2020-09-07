import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IUserProfile } from '../../models/interfaces/types';
import { ProfileService } from '../../core/services/profile.service';
import { SocialService } from '../../core/services/social.service';

@Injectable()
export class ProfilePageService implements OnDestroy {
  private _activeUserProfile: BehaviorSubject<IUserProfile> = new BehaviorSubject<IUserProfile>(null);
  public activeUserProfile$: Observable<IUserProfile> = this._activeUserProfile.asObservable();
  private selfUserProfile: IUserProfile;
  private _subscriptions: Subscription[] = [];

  constructor(private _profileService: ProfileService, private _socialService: SocialService) {}

  public ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public updateUserProfile(profile: IUserProfile) {
    profile.isSelf = profile.username === this.selfUserProfile.username;
    profile.isFollowing = this._socialService.isFollowed(profile, this.selfUserProfile.username);
    this._activeUserProfile.next(profile);
  }

  public setActiveUsername(value: string): void {
    this._subscriptions['active-profile'] = this._profileService
      .getProfile(value)
      .subscribe((profile: IUserProfile) => {
        this._profileService.userProfile$.subscribe((self) => {
          if (self) {
            this.selfUserProfile = self;
            profile.isSelf = profile.username === self.username;
            profile.isFollowing = this._socialService.isFollowing(self, profile.username);
            this._activeUserProfile.next(profile);
          }
        });
      });
  }
}
