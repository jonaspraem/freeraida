import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { Profile } from "../objects/models/profile.model";

import { ProfileObject } from "../objects/interfaces/profile-object.interface";

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

    constructor(private http: HttpClient, private errorService: ErrorService) {}

    getProfile(user_address: string) {
        return this.http.get<ProfileResponse>('http://localhost:3000/profile/user/'+user_address);
    }

    getProfileWithToken() {
        const token = localStorage.getItem('id_token');
        return this.http.get<ProfileResponse>('http://localhost:3000/profile/user-info', {params: new HttpParams().set('token', token)});
    }

    addressIsAvailable(address: string) {
        const token = localStorage.getItem('id_token');
        return this.http.get<AddressResponse>('http://localhost:3000/profile/user-address/'+address, {params: new HttpParams().set('token', token)});
    }

    createNewProfile(profile: Profile) {
        const body = JSON.stringify(profile);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post('http://localhost:3000/profile/new', body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    submitSettings(profile: Profile) {
        console.log('Submitting settings... '+profile.toString());
        const body = JSON.stringify(profile);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.patch('http://localhost:3000/profile/edit-profile'+token, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    followUser(user_address: string) {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post<ProfileResponse>('http://localhost:3000/connect/follow/'+user_address, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    unfollowUser(user_address: string) {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token');
        return this.http.post<ProfileResponse>('http://localhost:3000/connect/unfollow/'+user_address, body, {headers: headers, params: new HttpParams().set('token', token)})
    }
}