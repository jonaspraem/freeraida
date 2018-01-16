import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { PolylineCoords } from "./path.model";
import { LineService } from "./line.service";
import { Line } from "../objects/models/line.model";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
var RegisterLineComponent = /** @class */ (function () {
    function RegisterLineComponent(color_dictionary, cdRef, lineService, location) {
        this.color_dictionary = color_dictionary;
        this.cdRef = cdRef;
        this.lineService = lineService;
        this.location = {};
        this.lat = 51.678418;
        this.lng = 7.809007;
        this.location = location;
    }
    RegisterLineComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            // in your case
            // in your case
            _this.location = position.coords;
            _this.lat = position.coords.latitude;
            _this.lng = position.coords.longitude;
        });
        this.options = {
            chart: {
                type: "stackedAreaChart",
                height: 300,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 40
                },
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Distance (km)',
                },
                yAxis: {
                    axisLabel: 'Height (m above water surface)'
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [
                        1,
                        10
                    ],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: "dblclick.zoom"
                }
            }
        };
        this.data = [
            {
                key: "North America",
                values: [[0, 23.04], [30, 19.85], [49, 26.98]]
            }
        ];
    };
    RegisterLineComponent.prototype.getLineType = function () {
        if (this.selectedLineType == 'Climb')
            return 'ascent';
        else if (this.selectedLineType == 'Backcountry')
            return 'descent';
        else if (this.selectedLineType == 'Tour')
            return 'tour';
        else
            return 'white';
    };
    RegisterLineComponent.prototype.updatePolyCords = function () {
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
    RegisterLineComponent.prototype.mapClicked = function ($event) {
        var marker = {
            name: 'Point ' + (this.markers.length + 1),
            lat: $event.coords.lat,
            lng: $event.coords.lng
        };
        this.markers.push(marker);
        this.updatePolyCords();
        this.lineService.getHeightMap(this.markers).subscribe(function (data) { return console.log(data); });
        this.lineService.getDistance(this.markers).subscribe(function (data) { return console.log(data); });
    };
    RegisterLineComponent.prototype.clickedMarker = function (marker, index) {
        console.log('Clicked marker ' + marker.name + ' at index ' + index);
    };
    RegisterLineComponent.prototype.markerDragEnd = function (marker, $event) {
        for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.name == marker.name) {
                m.lat = $event.coords.lat;
                m.lng = $event.coords.lng;
            }
        }
        this.updatePolyCords();
    };
    RegisterLineComponent.prototype.removeMarker = function (marker) {
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].lat == marker.lat && this.markers[i].lng == marker.lng) {
                this.markers.splice(i, 1);
            }
        }
        this.updatePolyCords();
    };
    RegisterLineComponent.prototype.markerDeleteLast = function () {
        this.markers.splice(this.markers.length - 1, 1);
        this.updatePolyCords();
    };
    RegisterLineComponent.prototype.markerDeleteAll = function () {
        this.markers = [];
        this.updatePolyCords();
    };
    RegisterLineComponent.prototype.onSubmit = function () {
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
    RegisterLineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-register-line',
                    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
                    templateUrl: './register-line.component.html',
                    styleUrls: ['./register-line.component.css', '../../../node_modules/nvd3/build/nv.d3.css'],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    RegisterLineComponent.ctorParameters = function () { return [
        { type: COLOR_DICTIONARY, },
        { type: ChangeDetectorRef, },
        { type: LineService, },
        { type: Location, },
    ]; };
    return RegisterLineComponent;
}());
export { RegisterLineComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/register-line.component.js.map