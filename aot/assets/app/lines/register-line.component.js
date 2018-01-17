import { ChangeDetectorRef, Component, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { PolylineCoords } from "./path.model";
import { LineService } from "./line.service";
import { Line } from "../objects/models/line.model";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
import { AmChartsService } from "@amcharts/amcharts3-angular";
import { HeightMap } from "../objects/models/height-map.model";
import { DistancePoint } from "../objects/models/distance/distance-point.model";
var RegisterLineComponent = /** @class */ (function () {
    function RegisterLineComponent(color_dictionary, cdRef, line_service, AmCharts, location) {
        this.color_dictionary = color_dictionary;
        this.cdRef = cdRef;
        this.line_service = line_service;
        this.AmCharts = AmCharts;
        // Map variables
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
    };
    RegisterLineComponent.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    };
    RegisterLineComponent.prototype.ngAfterViewInit = function () {
        this.chart = this.AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "categoryField": "distance",
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[title]] of [[height]]:[[value]]",
                    "fillAlphas": 0.7,
                    "id": "AmGraph-1",
                    "lineAlpha": 0,
                    "title": "height map",
                    "lineColor": "#560000",
                    "valueField": "height"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "title": "Height (m)"
                }
            ],
            "allLabels": [],
            "balloon": {
                "fadeOutDuration": 0
            },
            "dataProvider": this.data
        });
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
        this.notifyChange();
        // this.lineService.getHeightMap(this.markers).subscribe(data => console.log(data));
        // this.lineService.getDistance(this.markers).subscribe(data => console.log(data));
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
        this.notifyChange();
    };
    RegisterLineComponent.prototype.removeMarker = function (marker) {
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].lat == marker.lat && this.markers[i].lng == marker.lng) {
                this.markers.splice(i, 1);
            }
        }
        this.notifyChange();
    };
    RegisterLineComponent.prototype.markerDeleteLast = function () {
        this.markers.splice(this.markers.length - 1, 1);
        this.notifyChange();
    };
    RegisterLineComponent.prototype.markerDeleteAll = function () {
        this.markers = [];
        this.notifyChange();
    };
    RegisterLineComponent.prototype.markerDeleteSingle = function (marker) {
        this.markers.splice(this.markers.indexOf(marker), 1);
        this.notifyChange();
    };
    /*
            Chart methods

            getDataProvider()
            updateChart()
     */
    /*
                Chart methods
    
                getDataProvider()
                updateChart()
         */
    RegisterLineComponent.prototype.getDataProvider = /*
                Chart methods
    
                getDataProvider()
                updateChart()
         */
    function () {
        var data = [];
        var distances = [];
        if (!(this.markers.length < 2)) {
            distances = DistancePoint.getScalingDistances(this.distance_list);
            for (var i = 0; i < distances.length; i++) {
                data.push({ "distance": distances[i].toFixed(2).toString() + " km", "height": this.height_map[i].elevation.toFixed(2) });
            }
            console.log(data);
            this.data = data;
        }
        this.cdRef.detectChanges();
        return data;
    };
    RegisterLineComponent.prototype.updateChart = function () {
        var _this = this;
        this.line_service.getDynamicHeightMap(this.markers).subscribe(function (data) {
            _this.height_map = HeightMap.fabricateList(data.obj);
            _this.line_service.getDynamicDistance(_this.markers).subscribe(function (data) {
                _this.distance_list = DistancePoint.fabricateList(data.obj);
                _this.data = _this.getDataProvider();
            });
        });
        // This must be called when making any changes to the chart
        this.AmCharts.updateChart(this.chart, function () {
            // Change whatever properties you want
            // Change whatever properties you want
            _this.chart.dataProvider = _this.getDataProvider();
        });
    };
    // Update visual data
    // Update visual data
    RegisterLineComponent.prototype.notifyChange = 
    // Update visual data
    function () {
        this.updatePolyCords();
        this.updateChart();
    };
    RegisterLineComponent.prototype.onSubmit = function () {
        var lineTransfer = new Line('', this.selectedLineName, this.selectedLineType, new Date(), this.markers, this.selectedDangerLevel, this.selectedTreeLevel, this.selectedRockLevel, this.selectedCliffLevel);
        // check for data
        if (lineTransfer.lineName &&
            lineTransfer.line_type &&
            lineTransfer.markers.length > 1 &&
            lineTransfer.danger_level &&
            lineTransfer.tree_level &&
            lineTransfer.rock_level &&
            lineTransfer.cliff_level) {
            // submit
            this.line_service.addLine(lineTransfer).subscribe(function (line) {
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
        { type: AmChartsService, },
        { type: Location, },
    ]; };
    return RegisterLineComponent;
}());
export { RegisterLineComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/register-line.component.js.map