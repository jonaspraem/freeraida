import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { ErrorService } from "../errors/error.service";
import { CONFIG } from "../dictionary/config";
var LineService = /** @class */ (function () {
    function LineService(http, errorService, config) {
        this.http = http;
        this.errorService = errorService;
        this.config = config;
    }
    LineService.prototype.addLine = function (line) {
        var body = JSON.stringify(line);
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post(this.config.getEndpoint() + '/lineservice/newline/', body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    LineService.prototype.getLines = function (username) {
        var token = localStorage.getItem('id_token');
        return this.http.get(this.config.getEndpoint() + '/lineservice/user/' + username, { params: new HttpParams().set('token', token) });
    };
    LineService.prototype.getHeightMap = function (line) {
        var token = localStorage.getItem('id_token');
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(this.config.getEndpoint() + '/line-info/height-map/' + line._id, { headers: headers, params: new HttpParams().set('token', token) });
    };
    LineService.prototype.getHeightMapUnregistered = function (line) {
        var token = localStorage.getItem('id_token');
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(this.config.getEndpoint() + '/line-info/height-map-unregistered/' + line._id, { headers: headers, params: new HttpParams().set('token', token) });
    };
    LineService.prototype.getDistance = function (line) {
        var token = localStorage.getItem('id_token');
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(this.config.getEndpoint() + '/line-info/distance/' + line._id, { headers: headers, params: new HttpParams().set('token', token) });
    };
    LineService.prototype.getDistanceUnregistered = function (line) {
        var token = localStorage.getItem('id_token');
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(this.config.getEndpoint() + '/line-info/distance-unregistered/' + line._id, { headers: headers, params: new HttpParams().set('token', token) });
    };
    LineService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LineService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: ErrorService, },
        { type: CONFIG, },
    ]; };
    return LineService;
}());
export { LineService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/line.service.js.map