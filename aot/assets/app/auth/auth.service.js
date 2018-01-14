import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenTransferModel } from "./token.model";
import { ProfileService } from "../profile/profile.service";
import { Profile } from "../objects/models/profile.model";
import { CONFIG } from "../dictionary/config";
var AuthService = /** @class */ (function () {
    function AuthService(router, http, profile_service, config) {
        this.router = router;
        this.http = http;
        this.profile_service = profile_service;
        this.config = config;
        this.isWelcome = false;
        this.auth0 = new auth0.WebAuth({
            clientID: 'RGHlxY9aYwq0DdMQEjXfz2XD7Z26KezJ',
            domain: 'freeraida.eu.auth0.com',
            responseType: 'token id_token',
            redirectUri: this.config.getEndpoint() + '/home',
            scope: 'openid userProfile email ',
            redirect: false
        });
    }
    AuthService.prototype.login = function () {
        this.auth0.authorize({
            container: 'hiw-login-container',
            auth: {
                redirect: false
            }
        });
        this.router.navigate(['/home']);
    };
    AuthService.prototype.initUser = function () {
        var _this = this;
        this.getTokenInfo()
            .subscribe(function (jsonData) {
            _this.profile_service.getProfileWithToken()
                .subscribe(function (data) { return _this.profile = Profile.fabricate(data.obj); }, function (err) {
                _this.isWelcome = true;
                _this.router.navigate(['home/settings']);
            });
        });
    };
    AuthService.prototype.handleAuthentication = function () {
        var _this = this;
        this.auth0.parseHash(function (err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                _this.setSession(authResult);
                _this.router.navigate(['/home']);
            }
            else if (err) {
                _this.router.navigate(['/landing-page']);
                console.log(err);
            }
        });
    };
    AuthService.prototype.setSession = function (authResult) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    };
    AuthService.prototype.logout = function () {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // Go back to the home route
        this.router.navigate(['/landing-page']);
    };
    AuthService.prototype.isAuthenticated = function () {
        // Check whether the current time is past the
        // access token's expiry time
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    };
    AuthService.prototype.getProfile = function () {
        var idToken = localStorage.getItem('id_token');
        if (!idToken) {
            throw new Error('Access token must exist to fetch userProfile');
        }
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var body = { id_token: idToken };
        return this.http.post('https://freeraida.eu.auth0.com/tokeninfo', body, { headers: headers });
    };
    AuthService.prototype.getTokenInfo = function () {
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var tokenObject = new TokenTransferModel(localStorage.getItem('id_token'));
        var body = JSON.stringify(tokenObject);
        return this.http.post('https://freeraida.eu.auth0.com/tokeninfo', body, { headers: headers });
    };
    AuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: Router, },
        { type: HttpClient, },
        { type: ProfileService, },
        { type: CONFIG, },
    ]; };
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/auth/auth.service.js.map