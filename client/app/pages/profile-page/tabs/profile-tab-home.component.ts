import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { IPost, IUserProfile } from '../../../models/interfaces/types';
import { ProfilePageService } from '../profile-page.service';
import { PostService } from '../../../core/services/post.service';

@Component({
  standalone: false,
  selector: 'app-profile-tab-home',
  template: `
    <div class="width-container-flex" *ngIf="userProfile$ | async as userProfile">
      <div class="grid-left">
        <app-profile-info-card [userProfile]="userProfile"></app-profile-info-card>
      </div>
      <div class="grid-main">
        <app-post *ngFor="let post of userFeed$ | async" [postModel]="post" [isLinked]="false"></app-post>
      </div>
      <div class="grid-right"></div>
    </div>
  `,
})
export class ProfileTabHomeComponent {
  public readonly userProfile$: Observable<IUserProfile> = this._profilePageService.activeUserProfile$.pipe(
    filter((profile): profile is IUserProfile => !!profile)
  );
  public readonly userFeed$: Observable<IPost[]> = this.userProfile$.pipe(
    switchMap((profile) => this._postService.getUserFeed(profile.username))
  );

  constructor(private _profilePageService: ProfilePageService, private _postService: PostService) {}
}
