import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { IUserProfile } from '../../../models/interfaces/types';
import { ProfilePageService } from '../profile-page.service';
import { SocialService } from '../../../core/services/social.service';

@Component({
  standalone: false,
  selector: 'app-profile-tab-home',
  template: `
    <div class="width-container">
      <ngx-masonry [options]="{ gutter: 20 }">
        <div ngxMasonryItem class="masonry-item" *ngFor="let user of userList$ | async">
          <app-profile-card [user]="user"></app-profile-card>
        </div>
      </ngx-masonry>
    </div>
  `,
})
export class ProfileTabFollowingComponent {
  public readonly userList$: Observable<IUserProfile[]> = this._profilePageService.activeUserProfile$.pipe(
    filter((profile): profile is IUserProfile => !!profile),
    switchMap((profile) => this._socialService.getFollowing(profile.username))
  );

  constructor(private _profilePageService: ProfilePageService, private _socialService: SocialService) {}
}
