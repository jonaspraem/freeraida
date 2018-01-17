import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CONFIG } from "../dictionary/config";
import { ErrorService } from "../errors/error.service";
var RidesService = /** @class */ (function () {
    function RidesService(http, errorService, config) {
        this.http = http;
        this.errorService = errorService;
        this.config = config;
    }
    RidesService.prototype.getTrackedLines = function () {
        var token = localStorage.getItem('id_token');
        return this.http.get(this.config.getEndpoint() + '/lineservice/unregistered-lines/', { params: new HttpParams().set('token', token) });
    };
    RidesService.prototype.getUserLines = function () {
        var token = localStorage.getItem('id_token');
        return this.http.get(this.config.getEndpoint() + '/lineservice/user-lines/', { params: new HttpParams().set('token', token) });
    };
    RidesService.prototype.deleteTrackedLine = function (_id) {
        var token = localStorage.getItem('id_token');
        return this.http.delete(this.config.getEndpoint() + '/lineservice/remove-tracked-line/' + _id, { params: new HttpParams().set('token', token) });
    };
    RidesService.prototype.deleteLine = function (_id) {
        var token = localStorage.getItem('id_token');
        return this.http.delete(this.config.getEndpoint() + '/lineservice/remove-line/' + _id, { params: new HttpParams().set('token', token) });
    };
    RidesService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RidesService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: ErrorService, },
        { type: CONFIG, },
    ]; };
    return RidesService;
}());
export { RidesService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/rides/rides.service.js.map