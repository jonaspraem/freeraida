import { Component, Input } from "@angular/core";
import { AmChartsService } from "@amcharts/amcharts3-angular";
import { LineService } from "../../line.service";
import { HeightMap } from "../../../objects/models/height-map.model";
import { DistancePoint } from "../../../objects/models/distance/distance-point.model";
import { TrackedLine } from "../../../objects/models/tracked-line.model";
var HeightmapUnregisteredComponent = /** @class */ (function () {
    function HeightmapUnregisteredComponent(AmCharts, line_service) {
        this.AmCharts = AmCharts;
        this.line_service = line_service;
    }
    HeightmapUnregisteredComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.line_service.getHeightMapUnregistered(this.line).subscribe(function (data) {
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
        this.line_service.getDistanceUnregistered(this.line).subscribe(function (data) {
            _this.distance_list = DistancePoint.fabricateList(data.obj);
        });
    };
    HeightmapUnregisteredComponent.prototype.ngAfterViewInit = function () {
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
    HeightmapUnregisteredComponent.prototype.getDataProvider = function () {
        var data = [];
        var distances = DistancePoint.getScalingDistances(this.distance_list);
        console.log(distances);
        for (var i = 0; i < distances.length; i++) {
            data.push({ "distance": distances[i].toFixed(2).toString() + " km", "height": this.height_map[i].elevation.toFixed(2) });
        }
        console.log(data);
        return data;
    };
    HeightmapUnregisteredComponent.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    };
    HeightmapUnregisteredComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-height-map-unregistered',
                    templateUrl: './heightmap-unregistered.component.html'
                },] },
    ];
    /** @nocollapse */
    HeightmapUnregisteredComponent.ctorParameters = function () { return [
        { type: AmChartsService, },
        { type: LineService, },
    ]; };
    HeightmapUnregisteredComponent.propDecorators = {
        "line": [{ type: Input },],
    };
    return HeightmapUnregisteredComponent;
}());
export { HeightmapUnregisteredComponent };
//# sourceMappingURL=D:/Projects/freeraida/assets/app/lines/heightmap/un-registered/heightmap-unregistered.component.js.map