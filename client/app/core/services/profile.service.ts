import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs';

import { Profile } from "../../legacy/objects/models/profile.model";
import { ProfileObject } from "../../legacy/objects/interfaces/profile-object.interface";
import { CONFIG } from "../../dictionary/config";
import { Router } from "@angular/router";

interface ProfileResponse {
    message: string;
    obj: ProfileObject;
}

interface AddressResponse {
    message: string;
    obj: boolean;
}

@Injectable()

export class ProfileService {
    public userProfile: any;

    constructor(
        private http: HttpClient,
        private config: CONFIG,
        private router: Router
    ) {}

    getProfile(username: string) {
        return this.http.get<ProfileResponse>(this.config.getEndpoint() + '/api/user-profile/user/'+username);
    }

    getProfileWithToken(): void {
        console.log('status');
        const token = localStorage.getItem('api_token');
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.get<ProfileResponse>(this.config.getEndpoint() + '/api/user-profile/user-info', {headers: headers, params: new HttpParams().set('token', token)})
            .subscribe(
                data => {
                    this.userProfile = data;
                    console.log(data);
                    //this.router.navigate(['/']);
                },
                err => {}
            );
    }

    addressIsAvailable(address: string) {
        const token = localStorage.getItem('id_token');
        return this.http.get<AddressResponse>(this.config.getEndpoint() + '/profile/user-address/'+address, {params: new HttpParams().set('token', token)});
    }

    createNewProfile(profile: Profile) {
        const body = JSON.stringify(profile);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post(this.config.getEndpoint() + '/profile/new', body, {headers: headers, params: new HttpParams().set('token', token)});
    }

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
        return this.http.post<ProfileResponse>(this.config.getEndpoint() + '/connect/follow/'+user_address, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    unfollowUser(user_address: string) {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post<ProfileResponse>(this.config.getEndpoint() + '/connect/unfollow/'+user_address, body, {headers: headers, params: new HttpParams().set('token', token)})
    }
}