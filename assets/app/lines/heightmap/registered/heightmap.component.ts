import { Component, Input, OnInit } from "@angular/core";
import { AmChart, AmChartsService } from "@amcharts/amcharts3-angular";
import { Line } from "../../../objects/models/line.model";
import { LineService } from "../../line.service";
import { HeightMap } from "../../../objects/models/height-map.model";
import { DistancePoint } from "../../../objects/models/distance/distance-point.model";
import { COLOR_DICTIONARY } from "../../../dictionary/color-dictionary";

@Component({
    selector: 'app-height-map',
    templateUrl: './heightmap.component.html'
})

export class HeightMapComponent implements OnInit {
    @Input() line: Line;
    private chart: AmChart;

    constructor(private AmCharts: AmChartsService,
                private color_dictionary: COLOR_DICTIONARY) {}

    ngOnInit(): void {

    }

    ngAfterViewInit() {
        this.chart = this.AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "categoryField": "distance",
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
            ]
        });
        // This must be called when making any changes to the chart
        this.AmCharts.updateChart(this.chart, () => {
            // Change whatever properties you want
            this.chart.dataProvider = this.getDataProvider();
        });
    }

    getDataProvider() {
        let data = [];
        for (let i = 0; i < this.line.markers.length; i++) {
            data.push({
                "distance": this.line.markers[i].distance_from_start.toFixed(2).toString()+" km",
                "height": this.line.markers[i].location.elevation.toFixed(2)
            });
        }
        return data;
    }

    ngOnDestroy() {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    }
}