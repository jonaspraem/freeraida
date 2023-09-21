import { Component, OnDestroy } from '@angular/core';
import { IUserProfile } from '../../../models/interfaces/types';
import { ProfilePageService } from '../profile-page.service';
import { Subscription } from 'rxjs';
import { SocialService } from '../../../core/services/social.service';

@Component({
  selector: 'app-profile-tab-home',
  template: `
    <div class="width-container">
      <ngx-masonry [options]="{ gutter: 20 }">
        <div ngxMasonryItem class="masonry-item" *ngFor="let user of userList">
          <app-profile-card [user]="user"></app-profile-card>
        </div>
      </ngx-masonry>
    </div>
  `,
})
export class ProfileTabFollowingComponent implements OnDestroy {
  public userProfile: IUserProfile;
  public userList: IUserProfile[];
  private _subscriptions: Subscription[] = [];

  constructor(private _profilePageService: ProfilePageService, private _socialService: SocialService) {}

  public ngOnInit(): void {
    this._subscriptions['activeUser'] = this._profilePageService.activeUserProfile$.subscribe((profile) => {
      // TODO check for feed changes
      if (!profile) {
        return;
      }

      this.userProfile = profile;
      this._subscriptions['followers'] = this._socialService
        .getFollowing(this.userProfile.username)
        .subscribe((followers) => {
          this.userList = followers;
        });
    });
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
