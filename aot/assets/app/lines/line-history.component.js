import { Component, Input } from "@angular/core";
import { PolylineCoords } from "./path.model";
import { LineService } from "./line.service";
var LineHistoryComponent = /** @class */ (function () {
    function LineHistoryComponent(lineService) {
        this.lineService = lineService;
    }
    // ngOnInit(): void {
    //     if (localStorage.getItem('username')) {
    //         this.lineService.getLines(localStorage.getItem('username'))
    //             .subscribe(
    //                 (lines: Line[]) => {
    //                     this.lines = lines;
    //                     console.log('component info: '+JSON.stringify(this.lines));
    //                 }
    //             );
    //     }
    // }
    // ngOnInit(): void {
    //     if (localStorage.getItem('username')) {
    //         this.lineService.getLines(localStorage.getItem('username'))
    //             .subscribe(
    //                 (lines: Line[]) => {
    //                     this.lines = lines;
    //                     console.log('component info: '+JSON.stringify(this.lines));
    //                 }
    //             );
    //     }
    // }
    LineHistoryComponent.prototype.indexExists = 
    // ngOnInit(): void {
    //     if (localStorage.getItem('username')) {
    //         this.lineService.getLines(localStorage.getItem('username'))
    //             .subscribe(
    //                 (lines: Line[]) => {
    //                     this.lines = lines;
    //                     console.log('component info: '+JSON.stringify(this.lines));
    //                 }
    //             );
    //     }
    // }
    function (index) {
        return (index != null);
    };
    LineHistoryComponent.prototype.getAverageLat = function (index) {
        var sum = 0;
        for (var _i = 0, _a = index.markers; _i < _a.length; _i++) {
            var m = _a[_i];
            sum += m.lat;
        }
        var average = sum / index.markers.length;
        return average;
    };
    LineHistoryComponent.prototype.getAverageLng = function (index) {
        var sum = 0;
        for (var _i = 0, _a = index.markers; _i < _a.length; _i++) {
            var m = _a[_i];
            sum += m.lng;
        }
        var average = sum / index.markers.length;
        return average;
    };
    LineHistoryComponent.prototype.getPolyCords = function (index) {
        var coordinates = [];
        var prev_lat;
        var prev_lng;
        for (var _i = 0, _a = index.markers; _i < _a.length; _i++) {
            var m = _a[_i];
            if (prev_lat && prev_lng)
                coordinates.push(new PolylineCoords(prev_lat, prev_lng, m.lat, m.lng));
            prev_lat = m.lat;
            prev_lng = m.lng;
        }
        return coordinates;
    };
    LineHistoryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-user-line-history',
                    templateUrl: './line-history.component.html',
                    styleUrls: ['./line-history.component.css']
                },] },
    ];
    /** @nocollapse */
    LineHistoryComponent.ctorParameters = function () { return [
        { type: LineService, },
    ]; };
    LineHistoryComponent.propDecorators = {
        "lines": [{ type: Input },],
    };
    return LineHistoryComponent;
}());
export { LineHistoryComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/line-history.component.js.map