import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { IPost, IUserProfile } from '../../models/interfaces/types';
import { ProfileService } from '../../core/services/profile.service';
import { PostService } from '../../core/services/post.service';

@Component({
  standalone: false,
  selector: 'app-home-page',
  templateUrl: './home.page.component.html',
})
export class HomePageComponent implements OnInit {
  public readonly userProfile$: Observable<IUserProfile> = this._profileService.userProfile$.pipe(
    filter((profile): profile is IUserProfile => !!profile)
  );
  public readonly homeFeed$: Observable<IPost[]> = this.userProfile$.pipe(
    switchMap(() => this._postService.refreshFeed())
  );

  constructor(private _profileService: ProfileService, private _postService: PostService) {}

  public ngOnInit(): void {}
}
