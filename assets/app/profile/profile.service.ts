import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { ErrorService } from "../errors/error.service";
import { Observable } from "rxjs/Observable";
import { Profile } from "./profile.model";
import { LineTransferModel } from "../lines/lineTransfer.model";
import { Post } from "../posts/post.model";

@Injectable()

export class ProfileService {
    public profile: Profile;

    constructor(private http: Http, private errorService: ErrorService) {}

    getProfile(user_address: string) {
        return this.http.get('http://localhost:3000/profile/user/'+user_address)
            .map((response: Response) => {
                const result = response.json().obj;
                const lines = [];
                for (let i = 0; i < result.lines; i++) {
                    lines.push(new LineTransferModel(
                        result.lines[i].lineName,
                        result.lines[i].markers,
                        result.lines[i].danger_level,
                        result.lines[i].tree_level,
                        result.lines[i].rock_level,
                        result.lines[i].cliff_level
                        ));
                }
                this.profile = new Profile(
                    result.firstName + ' ' + result.lastName,
                    result.user_address,
                    result.bio,
                    result.firstName,
                    result.lastName,
                    result.followers,
                    result.following,
                    result.representation,
                    result.social_twitter,
                    result.social_instagram,
                    lines
                );
                return this.profile;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getProfileWithToken() {
        const token = localStorage.getItem('id_token')
            ? '?token=' + localStorage.getItem('id_token')
            : '';
        return this.http.get('http://localhost:3000/profile/user-info' + token)
            .map((response: Response) => {
                const result = response.json().obj;
                const lines = [];
                for (let i = 0; i < result.lines; i++) {
                    lines.push(new LineTransferModel(
                        result.lines[i].lineName,
                        result.lines[i].markers,
                        result.lines[i].danger_level,
                        result.lines[i].tree_level,
                        result.lines[i].rock_level,
                        result.lines[i].cliff_level
                    ));
                }
                this.profile = new Profile(
                    result.firstName + ' ' + result.lastName,
                    result.user_address,
                    result.bio,
                    result.firstName,
                    result.lastName,
                    result.followers,
                    result.following,
                    result.representation,
                    result.social_twitter,
                    result.social_instagram,
                    lines
                );
                return this.profile;
            });
    }

    checkIfAddressIsAvailable(address: string) {
        const token = localStorage.getItem('id_token')
            ? '?token=' + localStorage.getItem('id_token')
            : '';
        return this.http.get('http://localhost:3000/profile/user-address/'+address+token)
            .map((response: Response) => {
                return (response.status == 200);
            });
    }

    createNewProfile(profile: Profile) {
        const body = JSON.stringify(profile);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('id_token')
            ? '?token=' + localStorage.getItem('id_token')
            : '';
        return this.http.post('http://localhost:3000/profile/new'+token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const lines = [];
                for (let i = 0; i < result.lines; i++) {
                    lines.push(new LineTransferModel(
                        result.lines[i].lineName,
                        result.lines[i].markers,
                        result.lines[i].danger_level,
                        result.lines[i].tree_level,
                        result.lines[i].rock_level,
                        result.lines[i].cliff_level
                    ));
                }
                const profile_model = new Profile(
                    result.firstName + ' ' + result.lastName,
                    result.user_address,
                    result.bio,
                    result.firstName,
                    result.lastName,
                    result.followers,
                    result.following,
                    result.representation,
                    result.social_twitter,
                    result.social_instagram,
                    lines
                );
                this.profile = profile;
                return this.profile;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    submitSettings(profile: Profile) {
        console.log('Submitting settings... '+profile.toString());
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

    isAddressAvailable(user_address: string) {
        return true;
    }
}