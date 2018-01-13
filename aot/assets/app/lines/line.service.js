import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { ErrorService } from "../errors/error.service";
var LineService = /** @class */ (function () {
    function LineService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
    }
    LineService.prototype.addLine = function (line) {
        // const body = JSON.stringify(line);
        // const headers = new Headers({'Content-Type': 'application/json'});
        // const token = localStorage.getItem('id_token')
        //     ? '?token=' + localStorage.getItem('id_token')
        //     : '';
        // console.log(body);
        // return this.http.post('http://localhost:3000/lineservice/newline/' + token, body, {headers: headers})
        //     .map((response: Response) => {
        //         const result = response.json().obj;
        //         const markers = [];
        //         for (let i = 0; i < result.markers.length; i++) {
        //             markers.push(new MapMarker(
        //                 result.markers[i].name,
        //                 result.markers[i].lat,
        //                 result.markers[i].lng
        //             ));
        //         }
        //         const line = new LineTransferModel(
        //             result.lineName,
        //             markers,
        //             result.danger_level,
        //             result.tree_level,
        //             result.rock_level,
        //             result.cliff_level,
        //
        //         );
        //         return line;
        //     })
        //     .catch((error: Response) => {
        //         this.errorService.handleError(error.json());
        //         return Observable.throw(error.json());
        //     });
    };
    LineService.prototype.getLines = function (username) {
        // return this.http.get('http://localhost:3000/lineservice/'+username)
        //     .map((response: Response) => {
        //         const lines = response.json().obj;
        //         let transformedLines: LineTransferModel[] = [];
        //         for (let line of lines) {
        //             let route: MapMarker[] = [];
        //             for (let marker of line.markers) {
        //                 route.push(new MapMarker(
        //                    marker.markerName,
        //                    marker.lat,
        //                    marker.lng
        //                 ));
        //             }
        //             transformedLines.push(new LineTransferModel(
        //                 line.lineName,
        //                 route,
        //                 line.danger_level,
        //                 line.tree_level,
        //                 line.rock_level,
        //                 line.cliff_level
        //             ));
        //         }
        //         return transformedLines;
        //     })
        //     .catch((error: Response) => {
        //         this.errorService.handleError(error.json());
        //         return Observable.throw(error.json());
        //     });
    };
    LineService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LineService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: ErrorService, },
    ]; };
    return LineService;
}());
export { LineService };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/line.service.js.map