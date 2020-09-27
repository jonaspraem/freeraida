import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs';
import { CONFIG } from '../../dictionary/config';
import { Router } from '@angular/router';
import { IUserProfile } from '../../models/interfaces/types';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProfileService {
  private _userProfile: BehaviorSubject<IUserProfile> = new BehaviorSubject<IUserProfile>(null);
  public userProfile$ = this._userProfile.asObservable();

  constructor(private http: HttpClient, private config: CONFIG, private router: Router) {
    this.getProfileWithToken();
  }

  public getProfile(username: string) {
    return this.http.get<IUserProfile>(this.config.getEndpoint() + '/api/user-profile/user/' + username);
  }

  public updateUserProfile(profile: IUserProfile) {
    this._userProfile.next(profile);
  }

  public getProfileWithToken(): void {
    const token = localStorage.getItem('api_token');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .get<IUserProfile>(this.config.getEndpoint() + '/api/user-profile/user-info', {
        headers: headers,
        params: new HttpParams().set('token', token),
      })
      .subscribe(
        (profile) => {
          this._userProfile.next(profile);
          localStorage.setItem('username', profile.username);
        },
        (err) => {
          this.router.navigate(['/landing-page']);
        }
      );
  }
}
