import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { ErrorService } from "../errors/error.service";
var ProfileService = /** @class */ (function () {
    function ProfileService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
    }
    ProfileService.prototype.getProfile = function (user_address) {
        return this.http.get('http://localhost:3000/profile/user/' + user_address);
    };
    ProfileService.prototype.getProfileWithToken = function () {
        var token = localStorage.getItem('id_token');
        return this.http.get('http://localhost:3000/profile/user-info', { params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.addressIsAvailable = function (address) {
        var token = localStorage.getItem('id_token');
        return this.http.get('http://localhost:3000/profile/user-address/' + address, { params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.createNewProfile = function (profile) {
        var body = JSON.stringify(profile);
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post('http://localhost:3000/profile/new', body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.submitSettings = function (profile) {
        console.log('Submitting settings... ' + profile.toString());
        var body = JSON.stringify(profile);
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.patch('http://localhost:3000/profile/edit-profile' + token, body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.followUser = function (user_address) {
        var body = '';
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post('http://localhost:3000/connect/follow/' + user_address, body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    ProfileService.prototype.unfollowUser = function (user_address) {
        var body = '';
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post('http://localhost:3000/connect/unfollow/' + user_address, body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    ProfileService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ProfileService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: ErrorService, },
    ]; };
    return ProfileService;
}());
export { ProfileService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/profile/profile.service.js.map