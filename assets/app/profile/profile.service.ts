import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs';

import { Profile } from "../objects/models/profile.model";
import { ProfileObject } from "../objects/interfaces/profile-object.interface";
import { CONFIG } from "../dictionary/config";

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

    constructor(private http: HttpClient,
                private config: CONFIG
    ) {}

    getProfile(user_address: string) {
        return this.http.get<ProfileResponse>(this.config.getEndpoint() + '/profile/user/'+user_address);
    }

    getProfileWithToken() {
        const token = localStorage.getItem('id_token');
        const headers = new HttpHeaders({'Acces-Control-Allow-Origin': '*'});
        return this.http.get<ProfileResponse>(this.config.getEndpoint() + '/profile/user-info', {headers: headers, params: new HttpParams().set('token', token)});
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