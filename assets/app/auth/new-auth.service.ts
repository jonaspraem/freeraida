import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { User } from "./user.model";
import { Observable } from "rxjs/Observable";
import { Http, Headers, Response } from "@angular/http";
import { TokenTransferModel } from "./token.model";

@Injectable()

export class NewAuthService {

    private auth0 = new auth0.WebAuth({
        clientID: 'RGHlxY9aYwq0DdMQEjXfz2XD7Z26KezJ',
        domain: 'freeraida.eu.auth0.com',
        responseType: 'token id_token',
        audience: 'https://freeraida.eu.auth0.com/userinfo',
        redirectUri: 'http://localhost:3000/home',
        scope: 'openid email user_metadata app_metadata picture',
        container: 'hiw-login-container'
    });

    constructor(public router: Router, public http: Http) {}

    public login(): void {
        this.auth0.authorize();
        this.router.navigate(['/home']);
    }

    public initUser(): void {
        console.log('initUser');
        this.getTokenInfo()
            .subscribe(
                (jsonData) => {
                    console.log('jsonData: '+jsonData.toString());
                    this.postLoginCheck(jsonData.user_id, jsonData.given_name, jsonData.family_name)
                        .subscribe(
                            (res) => {
                                console.log('response: '+res.toString());
                            }
                        );
                }
            );
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['/home']);
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

    private getTokenInfo() {
        const headers = new Headers({'Content-Type': 'application/json'});
        const tokenObject = new TokenTransferModel(localStorage.getItem('id_token'));
        const body = JSON.stringify(tokenObject);
        return this.http.post('https://freeraida.eu.auth0.com/tokeninfo', body, {headers: headers})
            .map((response: Response) => response.json())
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
                console.log(res.toString());
                return res;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

}