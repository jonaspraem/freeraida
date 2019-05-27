import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs';
import { CONFIG } from "../../dictionary/config";
import { Router } from "@angular/router";
import { IUserProfile } from "../../models/interfaces/types";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class ProfileService {
    private _userProfile: BehaviorSubject<IUserProfile> = new BehaviorSubject<IUserProfile>(null);
    public userProfile$ = this._userProfile.asObservable();

    constructor(
        private http: HttpClient,
        private config: CONFIG,
        private _router: Router
    ) {
        this.getProfileWithToken();
    }

    public getProfile(username: string) {
        return this.http.get<IUserProfile>(this.config.getEndpoint() + '/api/user-profile/user/' + username);
    }

    public updateUserProfile(profile: IUserProfile) {
        this._userProfile.next(profile);
    }

    private getProfileWithToken(): void {
        const token = localStorage.getItem('api_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.get<IUserProfile>(this.config.getEndpoint() + '/api/user-profile/user-info', {headers: headers, params: new HttpParams().set('token', token)})
            .subscribe(
                (profile) => {
                    this._userProfile.next(profile);
                    localStorage.setItem('username', profile.username);
                },
                err => {
                    this._router.navigate(['/landing-page']);
                }
            );
    }

    // public followUser(username: string): void {
    //     const token = localStorage.getItem('api_token');
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     this.http.get<IUserProfileResponse>(this.config.getEndpoint() + '/api/social/follow/' + username, {headers: headers, params: new HttpParams().set('token', token)})
    //         .subscribe(
    //             (data) => this._userProfile.next(data.obj)
    //         );
    // }
    //
    // public unfollowUser(username: string): void {
    //     const token = localStorage.getItem('api_token');
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     this.http.get<IUserProfileResponse>(this.config.getEndpoint() + '/api/social/unfollow/' + username, {headers: headers, params: new HttpParams().set('token', token)})
    //         .subscribe(
    //             (data) => this._userProfile.next(data.obj)
    //         );
    // }

    // addressIsAvailable(address: string) {
    //     const token = localStorage.getItem('id_token');
    //     return this.http.get<AddressResponse>(this.config.getEndpoint() + '/profile/user-address/'+address, {params: new HttpParams().set('token', token)});
    // }

    // submitSettings(profile: Profile) {
    //     console.log('Submitting settings... '+profile.toString());
    //     const body = JSON.stringify(profile);
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     const token = localStorage.getItem('id_token');
    //     return this.http.patch(this.config.getEndpoint() + '/profile/edit-profile', body, {headers: headers, params: new HttpParams().set('token', token)});
    // }
    //
    // followUser(user_address: string) {
    //     const body = '';
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     const token = localStorage.getItem('id_token');
    //     return this.http.post<IUserProfileResponse>(this.config.getEndpoint() + '/connect/follow/'+user_address, body, {headers: headers, params: new HttpParams().set('token', token)});
    // }
    //
    // unfollowUser(user_address: string) {
    //     const body = '';
    //     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    //     const token = localStorage.getItem('id_token');
    //     return this.http.post<IUserProfileResponse>(this.config.getEndpoint() + '/connect/unfollow/'+user_address, body, {headers: headers, params: new HttpParams().set('token', token)})
    // }
}