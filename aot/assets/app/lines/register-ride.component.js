import { ChangeDetectorRef, Component } from "@angular/core";
import { PolylineCoords } from "./path.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Line } from "../objects/models/line.model";
import { LineService } from "./line.service";
import { FLAG_DICTIONARY } from "../dictionary/flag-dictionary";
var RegisterRideComponent = /** @class */ (function () {
    function RegisterRideComponent(cdRef, lineService, flagMap) {
        this.cdRef = cdRef;
        this.lineService = lineService;
        this.flagMap = flagMap;
        this.lat = 51.678418;
        this.lng = 7.809007;
    }
    RegisterRideComponent.prototype.ngOnInit = function () {
        this.mapType = 'hybrid';
        this.markers = [];
        this.lineForm = new FormGroup({
            lineName: new FormControl(null, Validators.required),
            danger_level: new FormControl(null, Validators.required),
            tree_level: new FormControl(null, Validators.required),
            rock_level: new FormControl(null, Validators.required),
            cliff_level: new FormControl(null, Validators.required),
            markers: new FormControl(null, Validators.min(2))
        });
    };
    RegisterRideComponent.prototype.updatePolyCords = function () {
        var cords = [];
        var prev_lat;
        var prev_lng;
        for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
            var m = _a[_i];
            if (prev_lat && prev_lng)
                cords.push(new PolylineCoords(prev_lat, prev_lng, m.lat, m.lng));
            prev_lat = m.lat;
            prev_lng = m.lng;
        }
        this.polyCords = cords;
        this.cdRef.detectChanges();
    };
    RegisterRideComponent.prototype.mapClicked = function ($event) {
        var marker = {
            name: 'Point ' + (this.markers.length + 1),
            lat: $event.coords.lat,
            lng: $event.coords.lng
        };
        this.markers.push(marker);
        this.updatePolyCords();
    };
    RegisterRideComponent.prototype.clickedMarker = function (marker, index) {
        console.log('Clicked marker ' + marker.name + ' at index ' + index);
    };
    RegisterRideComponent.prototype.markerDragEnd = function (marker, $event) {
        for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.name == marker.name) {
                m.lat = $event.coords.lat;
                m.lng = $event.coords.lng;
            }
        }
        this.updatePolyCords();
    };
    RegisterRideComponent.prototype.removeMarker = function (marker) {
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].lat == marker.lat && this.markers[i].lng == marker.lng) {
                this.markers.splice(i, 1);
            }
        }
        this.updatePolyCords();
    };
    RegisterRideComponent.prototype.markerDeleteLast = function () {
        this.markers.splice(this.markers.length - 1, 1);
        this.updatePolyCords();
    };
    RegisterRideComponent.prototype.markerDeleteAll = function () {
        this.markers = [];
        this.updatePolyCords();
    };
    RegisterRideComponent.prototype.onSubmit = function () {
        var lineTransfer = new Line(this.lineForm.value.lineName, '', new Date(), this.markers, this.danger_level, this.tree_level, this.rock_level, this.cliff_level);
        // check for data
        if (lineTransfer.lineName &&
            lineTransfer.markers.length > 1 &&
            lineTransfer.danger_level &&
            lineTransfer.tree_level &&
            lineTransfer.rock_level &&
            lineTransfer.cliff_level) {
            // submit
            this.lineService.addLine(lineTransfer).subscribe(function (line) {
                console.log(line);
            });
        }
        else {
            console.log('cant submit');
        }
    };
    RegisterRideComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-register-ride',
                    templateUrl: './register-ride.component.html',
                    styleUrls: ['./register-ride.component.css']
                },] },
    ];
    /** @nocollapse */
    RegisterRideComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: LineService, },
        { type: FLAG_DICTIONARY, },
    ]; };
    return RegisterRideComponent;
}());
export { RegisterRideComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/register-ride.component.js.map