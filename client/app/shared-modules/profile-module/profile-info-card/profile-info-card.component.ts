import { Component, Input } from '@angular/core';
import { IUserProfile } from '../../../models/interfaces/types';
import { FLAG_DICTIONARY } from '../../../dictionary/flag-dictionary';
import { SocialService } from '../../../core/services/social.service';
import { ProfilePageService } from '../../../pages/profile-page/profile-page.service';

@Component({
  standalone: false,
  selector: 'app-profile-info-card',
  templateUrl: './profile-info-card.component.html',
})
export class ProfileInfoCardComponent {
  @Input() userProfile: IUserProfile;
  public isWaiting: boolean = false;

  constructor(
    private _socialService: SocialService,
    private _profilePageService: ProfilePageService,
    public flagDictionary: FLAG_DICTIONARY
  ) {}

  public onToggle(): void {
    if (this.isWaiting) {
      return;
    }
    this.isWaiting = true;
    this.userProfile.isFollowing
      ? this._socialService.unfollowUser(this.userProfile.username).subscribe((profile) => {
          this._profilePageService.updateUserProfile(profile);
          this.isWaiting = false;
        })
      : this._socialService.followUser(this.userProfile.username).subscribe((profile) => {
          this._profilePageService.updateUserProfile(profile);
          this.isWaiting = false;
        });
  }

  private wait(): void {}
}
