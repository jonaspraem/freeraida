import { Component, OnInit } from '@angular/core';
import { IPost, IUserProfile } from '../../models/interfaces/types';
import { ProfileService } from '../../core/services/profile.service';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
})
export class HomePageComponent implements OnInit {
  public userProfile: IUserProfile;
  public homeFeed: IPost[] = [];

  constructor(private _profileService: ProfileService, private _postService: PostService) {}

  public ngOnInit(): void {
    this._profileService.userProfile$.subscribe((profile) => {
      this.userProfile = profile;
    });
    this._postService.userFeed$.subscribe((data) => (this.homeFeed = data));
  }
}
