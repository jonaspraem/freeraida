import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CONFIG } from "../dictionary/config";
var TrackService = /** @class */ (function () {
    function TrackService(http, config) {
        this.http = http;
        this.config = config;
    }
    TrackService.prototype.postTrackedLine = function (line) {
        var body = JSON.stringify(line);
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('id_token');
        return this.http.post(this.config.getEndpoint() + '/lineservice/new-tracked-line/', body, { headers: headers, params: new HttpParams().set('token', token) });
    };
    TrackService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TrackService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: CONFIG, },
    ]; };
    return TrackService;
}());
export { TrackService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/tracker/track.service.js.map