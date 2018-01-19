import { Component, Input, OnInit } from "@angular/core";
import { AmChart, AmChartsService } from "@amcharts/amcharts3-angular";
import { LineService } from "../../line.service";
import { HeightMap } from "../../../objects/models/height-map.model";
import { DistancePoint } from "../../../objects/models/distance/distance-point.model";
import { TrackedLine } from "../../../objects/models/tracked-line.model";
import { COLOR_DICTIONARY } from "../../../dictionary/color-dictionary";

@Component({
    selector: 'app-height-map-unregistered',
    templateUrl: './heightmap-unregistered.component.html'
})

export class HeightmapUnregisteredComponent implements OnInit {
    @Input() line: TrackedLine;
    public height_map: HeightMap[];
    public distance_list: DistancePoint[];
    private data;
    private chart: AmChart;

    constructor(private AmCharts: AmChartsService,
                private line_service: LineService,
                public color_dictionary: COLOR_DICTIONARY) {}

    ngOnInit(): void {
        this.line_service.getHeightMapUnregistered(this.line).subscribe(data => {
            this.height_map = HeightMap.fabricateList(data.obj);
            this.line_service.getDistanceUnregistered(this.line).subscribe(data => {
                this.distance_list = DistancePoint.fabricateList(data.obj);
                // This must be called when making any changes to the chart
                this.AmCharts.updateChart(this.chart, () => {
                    // Change whatever properties you want
                    this.chart.dataProvider = this.getDataProvider();
                });
            });
        });
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
                    "lineColor": this.color_dictionary.get('tracked'),
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
    }

    getDataProvider() {
        let data = [];
        let distances: number[] = DistancePoint.getScalingDistances(this.distance_list);
        for (let i = 0; i < distances.length; i++) {
            data.push({"distance": distances[i].toFixed(2).toString()+" km", "height": this.height_map[i].elevation.toFixed(2)});
        }
        return data;
    }

    ngOnDestroy() {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    }
}