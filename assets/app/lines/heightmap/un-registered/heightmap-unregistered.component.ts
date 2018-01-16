import { Component, Input, OnInit } from "@angular/core";
import { AmChart, AmChartsService } from "@amcharts/amcharts3-angular";
import { Line } from "../../../objects/models/line.model";
import { LineService } from "../../line.service";
import { HeightMap } from "../../../objects/models/height-map.model";
import { DistancePoint } from "../../../objects/models/distance/distance-point.model";
import { TrackedLine } from "../../../objects/models/tracked-line.model";

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
                private line_service: LineService) {}

    ngOnInit(): void {
        this.line_service.getHeightMapUnregistered(this.line).subscribe(data => {
            this.height_map = HeightMap.fabricateList(data.obj);
            this.data = this.getDataProvider();
            console.log(this.data);
            // This must be called when making any changes to the chart
            this.AmCharts.updateChart(this.chart, () => {
                // Change whatever properties you want
                this.chart.dataProvider = this.getDataProvider();
            });
        });

        this.line_service.getDistanceUnregistered(this.line).subscribe(data => {
            this.distance_list = DistancePoint.fabricateList(data.obj);
        });

    }

    ngAfterViewInit() {
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
    }

    getDataProvider() {
        let data = [];
        let distances: number[] = DistancePoint.getScalingDistances(this.distance_list);
        console.log(distances);
        for (let i = 0; i < distances.length; i++) {
            data.push({"distance": distances[i].toFixed(2).toString()+" km", "height": this.height_map[i].elevation.toFixed(2)});
        }
        console.log(data);
        return data;
    }

    ngOnDestroy() {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
    }
}