import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { Line } from "../../../objects/models/line.model";
import { PolylineCoords } from "../../path.model";
var LineMapComponent = /** @class */ (function () {
    function LineMapComponent(cdRef) {
        this.cdRef = cdRef;
        this.lat = 51.678418;
        this.lng = 7.809007;
    }
    LineMapComponent.prototype.ngOnInit = function () {
        this.lat = this.getAverageLat();
        this.lng = this.getAverageLng();
        this.mapType = 'hybrid';
        this.updatePolyCords();
    };
    LineMapComponent.prototype.updatePolyCords = function () {
        var cords = [];
        var prev_lat;
        var prev_lng;
        for (var _i = 0, _a = this.line.markers; _i < _a.length; _i++) {
            var m = _a[_i];
            if (prev_lat && prev_lng)
                cords.push(new PolylineCoords(prev_lat, prev_lng, m.lat, m.lng));
            prev_lat = m.lat;
            prev_lng = m.lng;
        }
        this.polyCords = cords;
        this.cdRef.detectChanges();
    };
    LineMapComponent.prototype.getAverageLat = function () {
        var lat = 0;
        for (var i = 0; i < this.line.markers.length; i++) {
            lat += this.line.markers[i].lat;
        }
        return lat / this.line.markers.length;
    };
    LineMapComponent.prototype.getAverageLng = function () {
        var lng = 0;
        for (var i = 0; i < this.line.markers.length; i++) {
            lng += this.line.markers[i].lng;
        }
        return lng / this.line.markers.length;
    };
    LineMapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-line-map',
                    templateUrl: './line-map.component.html',
                    styleUrls: ['./line-map.component.css']
                },] },
    ];
    /** @nocollapse */
    LineMapComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    LineMapComponent.propDecorators = {
        "line": [{ type: Input },],
    };
    return LineMapComponent;
}());
export { LineMapComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/map/registered/line-map.component.js.map