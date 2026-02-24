import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { LineService } from '../../../core/services/line.service';
import { ProfilePageService } from '../profile-page.service';
import { ILine, IUserProfile } from '../../../models/interfaces/types';

@Component({
  standalone: false,
  selector: 'app-profile-tab-line-history',
  template: `
    <div class="width-container">
      <app-line-summary *ngFor="let line of lineList$ | async" [line]="line"></app-line-summary>
    </div>
  `,
})
export class ProfileTabLineHistoryComponent {
  public readonly lineList$: Observable<ILine[]> = this._profilePageService.activeUserProfile$.pipe(
    filter((profile): profile is IUserProfile => !!profile),
    switchMap((profile) => this._lineService.getUserLines(profile.username))
  );

  constructor(private _profilePageService: ProfilePageService, private _lineService: LineService) {}
}
