import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { IUserProfile } from '../../models/interfaces/types';
import { ProfilePageService } from './profile-page.service';

const hero = '/js/app/browser/images/licensed/iStock-01.jpg';
const profile_image = '/js/app/browser/images/rider/profile-image.jpg';

export enum ProfileTab {
  FEED,
  REPUTATION,
  LINES,
  FOLLOWING,
  FOLLOWERS,
  EDIT,
}

@Component({
  standalone: false,
  selector: 'app-profile-page',
  templateUrl: './profile.page.component.html',
})
export class ProfilePageComponent {
  public ProfileTab = ProfileTab;
  public readonly profile$: Observable<IUserProfile> = this._route.params.pipe(
    map((params) => params.username),
    distinctUntilChanged(),
    switchMap((username) => this._profilePageService.loadActiveUserProfile(username))
  );
  public hero = hero;
  public profile_image = profile_image;
  public activeTab: ProfileTab = ProfileTab.FEED;

  constructor(private _route: ActivatedRoute, private _profilePageService: ProfilePageService) {}
}
