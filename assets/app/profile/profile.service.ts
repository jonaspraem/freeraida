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
        return this.http.patch('http://localhost:3000/profile/edit-userProfile'+token, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    followUser(username: string) {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token');
        return this.http.post('http://localhost:3000/connect/follow/'+username, body, {headers: headers, params: new HttpParams().set('token', token)});
    }

    unfollowUser(username: string) {
        const body = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token');
        return this.http.post('http://localhost:3000/connect/unfollow/'+username, body, {headers: headers, params: new HttpParams().set('token', token)})
    }
}