import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CONFIG } from "../../dictionary/config";
import { IUserProfile } from "../../models/interfaces/types";
import { Observable } from "rxjs";

@Injectable()

export class SocialService {

    constructor(
        private _http: HttpClient,
        private _config: CONFIG,
    ) {}

    public followUser(username: string): Observable<IUserProfile> {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('api_token');
        return this._http.post<IUserProfile>(this._config.getEndpoint() + '/api/social/follow/' + username, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    public unfollowUser(username: string): Observable<IUserProfile> {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('api_token');
        return this._http.post<IUserProfile>(this._config.getEndpoint() + '/api/social/unfollow/' + username, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    public isFollowed(toCheck: IUserProfile, username: string): boolean {
        return toCheck.followers.indexOf(username) > -1;
    }

    public isFollowing(self: IUserProfile, username: string): boolean {
        return self.following.indexOf(username) > -1;
    }
}