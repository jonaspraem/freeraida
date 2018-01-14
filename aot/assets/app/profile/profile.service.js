import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { ErrorService } from "../errors/error.service";
import { CONFIG } from "../dictionary/config";
var ProfileService = /** @class */ (function () {
    function ProfileService(http, errorService, config) {
        this.http = http;
        this.errorService = errorService;
        this.config = config;
    }
    ProfileService.prototype.getProfile = function (user_address) {
        return this.http.get(this.config.getEndpoint() + '/profile/user/' + user_address);
    };
    ProfileService.prototype.getProfileWithToken = function () {
        var token = localStorage.getItem('id_token');
        return this.http.get(this.config.getEndpoint() + '/profile/user-info', { params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.addressIsAvailable = function (address) {
        var token = localStorage.getItem('id_token');
        return this.http.get(this.config.getEndpoint() + '/profile/user-address/' + address, { params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.createNewProfile = function (profile) {
        var body = JSON.stringify(profile);
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post(this.config.getEndpoint() + '/profile/new', body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.submitSettings = function (profile) {
        console.log('Submitting settings... ' + profile.toString());
        var body = JSON.stringify(profile);
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.patch(this.config.getEndpoint() + '/profile/edit-profile' + token, body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.followUser = function (user_address) {
        var body = '';
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post(this.config.getEndpoint() + '/connect/follow/' + user_address, body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.unfollowUser = function (user_address) {
        var body = '';
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post(this.config.getEndpoint() + '/connect/unfollow/' + user_address, body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    ProfileService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ProfileService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: ErrorService, },
        { type: CONFIG, },
    ]; };
    return ProfileService;
}());
export { ProfileService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/profile/profile.service.js.map