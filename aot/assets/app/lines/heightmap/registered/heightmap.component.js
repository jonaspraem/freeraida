import { Component, Input } from "@angular/core";
import { AmChartsService } from "@amcharts/amcharts3-angular";
import { Line } from "../../../objects/models/line.model";
import { LineService } from "../../line.service";
import { HeightMap } from "../../../objects/models/height-map.model";
import { DistancePoint } from "../../../objects/models/distance/distance-point.model";
import { COLOR_DICTIONARY } from "../../../dictionary/color-dictionary";
var HeightMapComponent = /** @class */ (function () {
    function HeightMapComponent(AmCharts, line_service, color_dictionary) {
        this.AmCharts = AmCharts;
        this.line_service = line_service;
        this.color_dictionary = color_dictionary;
    }
    HeightMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.line_service.getHeightMap(this.line).subscribe(function (data) {
            _this.height_map = HeightMap.fabricateList(data.obj);
            _this.data = _this.getDataProvider();
            console.log(_this.data);
            // This must be called when making any changes to the chart
            // This must be called when making any changes to the chart
            _this.AmCharts.updateChart(_this.chart, function () {
                // Change whatever properties you want
                // Change whatever properties you want
                _this.chart.dataProvider = _this.getDataProvider();
            });
        });
        this.line_service.getDistance(this.line).subscribe(function (data) {
            console.log('data from distance ' + data);
            _this.distance_list = DistancePoint.fabricateList(data.obj);
            // This must be called when making any changes to the chart
            // This must be called when making any changes to the chart
            _this.AmCharts.updateChart(_this.chart, function () {
                // Change whatever properties you want
                // Change whatever properties you want
                _this.chart.dataProvider = _this.getDataProvider();
            });
        });
    };
    HeightMapComponent.prototype.ngAfterViewInit = function () {
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
                    "lineColor": this.color_dictionary.get(this.color_dictionary.getAlias(this.line.line_type.toLowerCase())),
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
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Height Map"
                }
            ],
            "dataProvider": this.data
        });
    };
    HeightMapComponent.prototype.getDataProvider = function () {
        var data = [];
        var distances = DistancePoint.getScalingDistances(this.distance_list);
        console.log(distances);
        for (var i = 0; i < distances.length; i++) {
            data.push({ "distance": distances[i].toFixed(2).toString() + " km", "height": this.height_map[i].elevation.toFixed(2) });
        }
        console.log(data);
        this.data = data;
        return data;
    };
    HeightMapComponent.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    };
    HeightMapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-height-map',
                    templateUrl: './heightmap.component.html'
                },] },
    ];
    /** @nocollapse */
    HeightMapComponent.ctorParameters = function () { return [
        { type: AmChartsService, },
        { type: LineService, },
        { type: COLOR_DICTIONARY, },
    ]; };
    HeightMapComponent.propDecorators = {
        "line": [{ type: Input },],
    };
    return HeightMapComponent;
}());
export { HeightMapComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/heightmap/registered/heightmap.component.js.map