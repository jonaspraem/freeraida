import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { MapMarker } from "../objects/models/mapmarker.model";
import { PolylineCoords } from "./path.model";
import { LineService } from "./line.service";
import { Line } from "../objects/models/line.model";
import { COLOR_DICTIONARY } from "../dictionary/color-dictionary";
import { AmChart, AmChartsService } from "@amcharts/amcharts3-angular";
import { HeightMap } from "../objects/models/height-map.model";
import { DistancePoint } from "../objects/models/distance/distance-point.model";

@Component({
    selector: 'app-register-line',
    providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
    templateUrl: './register-line.component.html',
    styleUrls: ['./register-line.component.css', '../../../node_modules/nvd3/build/nv.d3.css'],
    encapsulation: ViewEncapsulation.None
})

export class RegisterLineComponent implements OnInit {
    // User Inputs
    selectedLineType: string;
    selectedLineName: string;
    selectedDangerLevel: string;
    selectedTreeLevel: string;
    selectedRockLevel: string;
    selectedCliffLevel: string;

    // Map variables
    location = {};
    lat: number = 51.678418;
    lng: number = 7.809007;
    mapType: string;
    polyCords: PolylineCoords[];

    // Form values
    lineForm: FormGroup;
    markers: MapMarker[];
    danger_level: string;
    tree_level: string;
    rock_level: string;
    cliff_level: string;

    // Chart variables
    public height_map: HeightMap[];
    public distance_list: DistancePoint[];
    private chart: AmChart;
    private data;

    constructor(public color_dictionary: COLOR_DICTIONARY,
                private cdRef: ChangeDetectorRef,
                private line_service: LineService,
                private AmCharts: AmChartsService,
                location: Location
    ) {
        this.location = location;
    }

    ngOnInit(): void {
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

        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            // in your case
            this.location = position.coords;
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
        });

    }

    ngOnDestroy() {
        if (this.chart) {
            this.AmCharts.destroyChart(this.chart);
        }
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
            "dataProvider": this.data
        });
    }

    getLineType() {
        if (this.selectedLineType == 'Climb') return 'ascent';
        else if (this.selectedLineType == 'Backcountry') return 'descent';
        else if (this.selectedLineType == 'Tour') return 'tour';
        else return 'white';
    }

    updatePolyCords() {
        let cords: PolylineCoords[] = [];
        let prev_lat;
        let prev_lng;
        for (let m of this.markers) {
            if (prev_lat && prev_lng) cords.push(new PolylineCoords(prev_lat, prev_lng, m.lat, m.lng));
            prev_lat = m.lat;
            prev_lng = m.lng;
        }
        this.polyCords =  cords;
        this.cdRef.detectChanges();
    }

    mapClicked($event:any){
        const marker: MapMarker = {
            name: 'Point '+(this.markers.length + 1),
            lat: $event.coords.lat,
            lng: $event.coords.lng
        };
        this.markers.push(marker);
        this.notifyChange();
        // this.lineService.getHeightMap(this.markers).subscribe(data => console.log(data));
        // this.lineService.getDistance(this.markers).subscribe(data => console.log(data));
    }

    clickedMarker(marker:MapMarker, index:number) {
        console.log('Clicked marker '+marker.name+' at index '+index);
    }

    markerDragEnd(marker:any, $event:any) {
        for (let m of this.markers) {
            if (m.name == marker.name) {
                m.lat = $event.coords.lat;
                m.lng = $event.coords.lng;
            }
        }
        this.notifyChange();
    }

    removeMarker(marker) {
        for (let i = 0; i < this.markers.length; i++) {
            if (this.markers[i].lat == marker.lat && this.markers[i].lng == marker.lng) {
                this.markers.splice(i, 1);
            }
        }
        this.notifyChange();
    }

    markerDeleteLast() {
        this.markers.splice(this.markers.length-1, 1);
        this.notifyChange();
    }

    markerDeleteAll() {
        this.markers = [];
        this.notifyChange();
    }

    markerDeleteSingle(marker: MapMarker) {
        this.markers.splice(this.markers.indexOf(marker), 1);
        this.notifyChange();
    }

    /*
            Chart methods

            getDataProvider()
            updateChart()
     */

    getDataProvider() {
        let data = [];
        let distances: number[] = [];
        if (!(this.markers.length < 2)) {
            distances = DistancePoint.getScalingDistances(this.distance_list);
            for (let i = 0; i < distances.length; i++) {
                data.push({"distance": distances[i].toFixed(2).toString()+" km", "height": this.height_map[i].elevation.toFixed(2)});
            }
            console.log(data);
            this.data = data;
        }
        this.cdRef.detectChanges();
        return data;
    }

    updateChart() {
        this.line_service.getDynamicHeightMap(this.markers).subscribe(data => {
            this.height_map = HeightMap.fabricateList(data.obj);
            this.line_service.getDynamicDistance(this.markers).subscribe(data => {
                this.distance_list = DistancePoint.fabricateList(data.obj);
                this.data = this.getDataProvider();
            });
        });


        // This must be called when making any changes to the chart
        this.AmCharts.updateChart(this.chart, () => {
            // Change whatever properties you want
            this.chart.dataProvider = this.getDataProvider();
        });
    }

    // Update visual data
    notifyChange() {
        this.updatePolyCords();
        this.updateChart();
    }

    onSubmit() {
        const lineTransfer = new Line('', this.lineForm.value.lineName, '', new Date(), this.markers, this.danger_level, this.tree_level, this.rock_level, this.cliff_level);
        // check for data
        if (lineTransfer.lineName &&
            lineTransfer.markers.length > 1 &&
            lineTransfer.danger_level &&
            lineTransfer.tree_level &&
            lineTransfer.rock_level &&
            lineTransfer.cliff_level) {
            // submit
            this.line_service.addLine(lineTransfer).subscribe(
                (line: Line) => {
                    console.log(line);
                });
        }
        // TODO: make better error message
        else {
            console.log('cant submit');
        }
    }
}