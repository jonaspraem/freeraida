import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { IUserProfileResponse } from "../../models/interfaces/responses";
import { CONFIG } from "../../dictionary/config";
import { Observable } from "rxjs";
import { IUserProfile } from "../../models/interfaces/types";
import { ProfileService } from "./profile.service";

@Injectable()

export class SocialService {

    constructor(
        private _http: HttpClient,
        private _config: CONFIG,
        private _profileService: ProfileService
    ) {}

    public followUser(username: string): void {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('api_token');
        this._http.post<IUserProfileResponse>(this._config.getEndpoint() + '/api/social/follow/'+username, body, {headers: headers, params: new HttpParams().set('token', token)})
            .subscribe(data => {
                this._profileService.updateUserProfile(data.obj);
            });
    }

    public unfollowUser(username: string): void {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('api_token');
        this._http.post<IUserProfileResponse>(this._config.getEndpoint() + '/api/social/unfollow/'+username, body, {headers: headers, params: new HttpParams().set('token', token)})
            .subscribe(data => {
                this._profileService.updateUserProfile(data.obj);
            });
    }

    public isFollowing(self: IUserProfile, username: string): boolean {
        return self.following.indexOf(username) > -1;
    }
}