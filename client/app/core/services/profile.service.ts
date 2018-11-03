import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs';
import { Profile } from "../../legacy/objects/models/profile.model";
import { CONFIG } from "../../dictionary/config";
import { Router } from "@angular/router";
import { IUserProfile } from "../../models/interfaces/types";
import { IUserProfileResponse } from "../../models/interfaces/responses";

@Injectable()

export class ProfileService {
    public userProfile: IUserProfile;

    constructor(
        private http: HttpClient,
        private config: CONFIG,
    ) {}

    getProfile(username: string) {
        return this.http.get<IUserProfileResponse>(this.config.getEndpoint() + '/api/user-profile/user/'+username);
    }

    getProfileWithToken(): void {
        const token = localStorage.getItem('api_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.get<IUserProfileResponse>(this.config.getEndpoint() + '/api/user-profile/user-info', {headers: headers, params: new HttpParams().set('token', token)})
            .subscribe(
                (data) => {
                    this.userProfile = data.obj;
                    localStorage.setItem('username', data.obj.username);
                },
                err => {}
            );
    }

    // addressIsAvailable(address: string) {
    //     const token = localStorage.getItem('id_token');
    //     return this.http.get<AddressResponse>(this.config.getEndpoint() + '/profile/user-address/'+address, {params: new HttpParams().set('token', token)});
    // }

    submitSettings(profile: Profile) {
        console.log('Submitting settings... '+profile.toString());
        const body = JSON.stringify(profile);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.patch(this.config.getEndpoint() + '/profile/edit-profile', body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    followUser(user_address: string) {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post<IUserProfileResponse>(this.config.getEndpoint() + '/connect/follow/'+user_address, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    unfollowUser(user_address: string) {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post<IUserProfileResponse>(this.config.getEndpoint() + '/connect/unfollow/'+user_address, body, {headers: headers, params: new HttpParams().set('token', token)})
    }
}