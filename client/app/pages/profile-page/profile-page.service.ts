import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, forkJoin } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { IUserProfile } from '../../models/interfaces/types';
import { ProfileService } from '../../core/services/profile.service';
import { SocialService } from '../../core/services/social.service';

@Injectable()
export class ProfilePageService implements OnDestroy {
  private _activeUserProfile: BehaviorSubject<IUserProfile> = new BehaviorSubject<IUserProfile>(null);
  public readonly activeUserProfile$: Observable<IUserProfile> = this._activeUserProfile.asObservable();
  private selfUserProfile: IUserProfile;
  private _subscriptions: Subscription[] = [];

  constructor(private _profileService: ProfileService, private _socialService: SocialService) {}

  public ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public updateUserProfile(profile: IUserProfile) {
    if (!this.selfUserProfile) {
      this._activeUserProfile.next(profile);
      return;
    }
    profile.isSelf = profile.username === this.selfUserProfile.username;
    profile.isFollowing = this._socialService.isFollowed(profile, this.selfUserProfile.username);
    this._activeUserProfile.next(profile);
  }

  public loadActiveUserProfile(username: string): Observable<IUserProfile> {
    return forkJoin({
      profile: this._profileService.getProfile(username),
      self: this._profileService.userProfile$.pipe(
        filter((self): self is IUserProfile => !!self),
        take(1)
      ),
    }).pipe(
      map(({ profile, self }) => {
        this.selfUserProfile = self;
        return {
          ...profile,
          isSelf: profile.username === self.username,
          isFollowing: this._socialService.isFollowing(self, profile.username),
        };
      }),
      tap((profile) => this._activeUserProfile.next(profile))
    );
  }

  public setActiveUsername(value: string): void {
    this._subscriptions['active-profile']?.unsubscribe();
    this._subscriptions['active-profile'] = this.loadActiveUserProfile(value).subscribe();
  }
}
