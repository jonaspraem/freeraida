import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, finalize, switchMap } from 'rxjs/operators';
import { IPost, IUserProfile } from '../../../models/interfaces/types';
import { ProfilePageService } from '../profile-page.service';
import { PostService } from '../../../core/services/post.service';
import { SocialService } from '../../../core/services/social.service';

@Component({
  standalone: false,
  selector: 'app-profile-tab-home',
  template: `
    <div class="width-container-flex" *ngIf="userProfile$ | async as userProfile">
      <div class="grid-left">
        <app-profile-info-card
          [userProfile]="userProfile"
          [isWaiting]="isFollowActionPending"
          (toggleFollow)="onToggleFollow(userProfile)"
        ></app-profile-info-card>
      </div>
      <div class="grid-main">
        <app-post *ngFor="let post of userFeed$ | async" [postModel]="post" [isLinked]="false"></app-post>
      </div>
      <div class="grid-right"></div>
    </div>
  `,
})
export class ProfileTabHomeComponent {
  public isFollowActionPending = false;
  public readonly userProfile$: Observable<IUserProfile> = this._profilePageService.activeUserProfile$.pipe(
    filter((profile): profile is IUserProfile => !!profile)
  );
  public readonly userFeed$: Observable<IPost[]> = this.userProfile$.pipe(
    switchMap((profile) => this._postService.getUserFeed(profile.username))
  );

  constructor(
    private _profilePageService: ProfilePageService,
    private _postService: PostService,
    private _socialService: SocialService
  ) {}

  public onToggleFollow(userProfile: IUserProfile): void {
    if (this.isFollowActionPending) {
      return;
    }

    this.isFollowActionPending = true;
    const followRequest$ = userProfile.isFollowing
      ? this._socialService.unfollowUser(userProfile.username)
      : this._socialService.followUser(userProfile.username);

    followRequest$
      .pipe(finalize(() => (this.isFollowActionPending = false)))
      .subscribe((profile) => this._profilePageService.updateUserProfile(profile));
  }
}
