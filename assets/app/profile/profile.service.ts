import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { Observable } from "rxjs/Observable";
import { Profile } from "./profile.model";

@Injectable()

export class ProfileService {
    public profile: Profile;

    constructor(private http: Http, private errorService: ErrorService) {}

    getProfile(username: string) {
        return this.http.get('http://localhost:3000/profile/'+username)
            .map((response: Response) => {
                const result = response.json().obj;
                const profile = new Profile(
                    result.username,
                    result.bio,
                    result.firstName,
                    result.lastName,
                    result.followers,
                    result.following
                );
                this.profile = profile;
                return this.profile;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    followUser(username: string) {
        const body = '';
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/connect/follow/'+username+token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const profile = new Profile(
                    result.username,
                    result.bio,
                    result.firstName,
                    result.lastName,
                    result.followers,
                    result.following
                );
                this.profile = profile;
                return this.profile;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    unfollowUser(username: string) {
        const body = '';
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/connect/unfollow/'+username+token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const profile = new Profile(
                    result.username,
                    result.bio,
                    result.firstName,
                    result.lastName,
                    result.followers,
                    result.following
                );
                this.profile = profile;
                return this.profile;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}