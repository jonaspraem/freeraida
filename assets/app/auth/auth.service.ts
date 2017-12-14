import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { User } from "./user.model";
import { Observable } from "rxjs/Observable";
import { Http, Headers, Response } from "@angular/http";
import { TokenTransferModel } from "./token.model";
import { ProfileService } from "../profile/profile.service";

@Injectable()

export class AuthService {
    public isWelcome = false;
    userProfile: any;

    private auth0 = new auth0.WebAuth({
        clientID: 'RGHlxY9aYwq0DdMQEjXfz2XD7Z26KezJ',
        domain: 'freeraida.eu.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:3000/home',
        scope: 'openid profile email ',
        redirect: false
    });

    constructor(public router: Router,
                public http: Http,
                private profile_service: ProfileService) {}

    public login(): void {
        this.auth0.authorize({
            container: 'hiw-login-container',
            auth: {
                redirect: false
            }
        });
        this.router.navigate(['/home']);
    }

    public initUser(): void {
        this.getTokenInfo()
            .subscribe(
                (jsonData) => {
                    this.profile_service.getProfileWithToken()
                        .subscribe(
                            data => console.log(data),
                            err => {
                                this.isWelcome = true;
                                this.router.navigate(['home/settings']);
                            }
                        );
                }
            );
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['/landing-page']);
                console.log(err);
            }
        });
    }

    private setSession(authResult): void {
        // Set the time that the access token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/landing-page']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    public getProfile() {
        const idToken = localStorage.getItem('id_token');
        if (!idToken) {
            throw new Error('Access token must exist to fetch profile');
        }

        const headers = new Headers({'Content-Type': 'application/json'});
        const body = { id_token: idToken };
        return this.http.post('https://freeraida.eu.auth0.com/tokeninfo', body, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    private getTokenInfo() {
        const headers = new Headers({'Content-Type': 'application/json'});
        const tokenObject = new TokenTransferModel(localStorage.getItem('id_token'));
        const body = JSON.stringify(tokenObject);
        return this.http.post('https://freeraida.eu.auth0.com/tokeninfo', body, {headers: headers})
            .map((response: Response) => {
                return response.json()
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    private postLoginCheck(user_id, given_name, family_name) {
        const profile_headers = new Headers({'Content-Type': 'application/json'});
        const user = new User(
            user_id,
            given_name,
            family_name,
        );
        const profile_body = JSON.stringify(user);

        return this.http.post('http://localhost:3000/user-init/', profile_body, {headers: profile_headers})
            .map((response: Response) => {
                const res = response.json();
                return res;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

}