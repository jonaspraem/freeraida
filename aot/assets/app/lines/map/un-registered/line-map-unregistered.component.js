import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { PolylineCoords } from "../../path.model";
import { TrackedLine } from "../../../objects/models/tracked-line.model";
var LineMapUnregisteredComponent = /** @class */ (function () {
    function LineMapUnregisteredComponent(cdRef) {
        this.cdRef = cdRef;
        this.lat = 51.678418;
        this.lng = 7.809007;
    }
    LineMapUnregisteredComponent.prototype.ngOnInit = function () {
        this.lat = this.getAverageLat();
        this.lng = this.getAverageLng();
        this.mapType = 'hybrid';
        this.updatePolyCords();
    };
    LineMapUnregisteredComponent.prototype.updatePolyCords = function () {
        var cords = [];
        var prev_lat;
        var prev_lng;
        for (var _i = 0, _a = this.line.locations; _i < _a.length; _i++) {
            var m = _a[_i];
            if (prev_lat && prev_lng)
                cords.push(new PolylineCoords(prev_lat, prev_lng, m.lat, m.lng));
            prev_lat = m.lat;
            prev_lng = m.lng;
        }
        this.polyCords = cords;
        this.cdRef.detectChanges();
    };
    LineMapUnregisteredComponent.prototype.getAverageLat = function () {
        var lat = 0;
        for (var i = 0; i < this.line.locations.length; i++) {
            lat += this.line.locations[i].lat;
        }
        return lat / this.line.locations.length;
    };
    LineMapUnregisteredComponent.prototype.getAverageLng = function () {
        var lng = 0;
        for (var i = 0; i < this.line.locations.length; i++) {
            lng += this.line.locations[i].lng;
        }
        return lng / this.line.locations.length;
    };
    LineMapUnregisteredComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-line-map-unregistered',
                    templateUrl: './line-map-unregistered.component.html',
                    styleUrls: ['./line-map-unregistered.component.css']
                },] },
    ];
    /** @nocollapse */
    LineMapUnregisteredComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    LineMapUnregisteredComponent.propDecorators = {
        "line": [{ type: Input },],
    };
    return LineMapUnregisteredComponent;
}());
export { LineMapUnregisteredComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/map/un-registered/line-map-unregistered.component.js.map