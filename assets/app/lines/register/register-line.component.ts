import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { MapMarker } from "../../objects/models/mapmarker.model";
import { PolylineCoords } from "../path.model";
import { LineService } from "../line.service";
import { Line } from "../../objects/models/line.model";
import { COLOR_DICTIONARY } from "../../dictionary/color-dictionary";
import { AmChart, AmChartsService } from "@amcharts/amcharts3-angular";
import { HeightMap } from "../../objects/models/height-map.model";
import { DistancePoint } from "../../objects/models/distance/distance-point.model";
import { LineLocation } from "../../objects/models/line-location.model";

@Component({
    selector: 'app-register-line',
    templateUrl: './register-line.component.html',
    styleUrls: ['./register-line.component.css', '../../../../node_modules/nvd3/build/nv.d3.css'],
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
    lat: number = 45.92375;
    lng: number = 6.86933;
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
    ) {
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
            }
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
            if (prev_lat && prev_lng) cords.push(new PolylineCoords(prev_lat, prev_lng, m.location.lat, m.location.lng));
            prev_lat = m.location.lat;
            prev_lng = m.location.lng;
        }
        this.polyCords =  cords;
        this.cdRef.detectChanges();
    }

    mapClicked($event:any){
        const marker: MapMarker = {
            index: this.markers.length,
            name: 'Point '+(this.markers.length + 1),
            location: new LineLocation($event.coords.lat, $event.coords.lng)
        };
        this.markers.push(marker);
        this.notifyChange();
    }

    clickedMarker(marker:MapMarker, index:number) {
        console.log('Clicked marker '+marker.name+' at index '+index);
    }

    markerDragEnd(marker:any, $event:any) {
        for (let m of this.markers) {
            if (m.name == marker.name) {
                m.location.lat = $event.coords.lat;
                m.location.lng = $event.coords.lng;
            }
        }
        this.notifyChange();
    }

    removeMarker(marker) {
        for (let i = 0; i < this.markers.length; i++) {
            if (this.markers[i].location.lat == marker.lat && this.markers[i].location.lng == marker.lng) {
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
        console.log('DATAPROVIDER: '+JSON.stringify(this.markers));
        if (!(this.markers.length < 2)) {
            for (let i = 0; i < this.markers.length; i++) {
                data.push({
                    "distance": this.markers[i].distance_from_start.toFixed(2).toString()+" km",
                    "height": this.markers[i].location.elevation.toFixed(2)
                });
            }
            console.log(data);
            this.data = data;
        }
        return data;
    }

    updateChart() {
        this.line_service.getDynamicHeightMap(this.markers).subscribe(height_data => {
            this.line_service.getDynamicDistance(this.markers).subscribe(distance_data => {
                console.log('distance data'+ JSON.stringify(distance_data));
                let distances = DistancePoint.getScalingDistances(distance_data.obj);
                let markers = [];
                for (let i = 0; i < this.markers.length; i++) {
                    let name = this.markers[i].name;
                    let lat = this.markers[i].location.lat;
                    let lng = this.markers[i].location.lng;
                    markers.push(new MapMarker(
                        i,
                        name,
                        new LineLocation(
                            lat,
                            lng,
                            height_data.obj[i].elevation,
                            height_data.obj[i].resolution),
                        distances[i]));
                }
                this.markers = markers;

                // This must be called when making any changes to the chart
                this.AmCharts.updateChart(this.chart, () => {
                    // Change whatever properties you want
                    this.chart.dataProvider = this.getDataProvider();
                });
            });
        });
    }

    // Update visual data
    notifyChange() {
        this.updatePolyCords();
        this.updateChart();
    }

    onSubmit() {
        console.log(this.selectedLineName);
        const lineTransfer = new Line(
            '',
            this.selectedLineName,
            this.selectedLineType,
            new Date(),
            this.markers,
            this.selectedDangerLevel,
            this.selectedTreeLevel,
            this.selectedRockLevel,
            this.selectedCliffLevel);
        console.log(lineTransfer);
        // check for data
        if (lineTransfer.name &&
            lineTransfer.line_type &&
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
            console.log(lineTransfer.name);
            console.log(lineTransfer.line_type);
            console.log(lineTransfer.markers.length);
            console.log(lineTransfer.danger_level);
            console.log(lineTransfer.tree_level);

            console.log('cant submit ' + lineTransfer);
            console.log(lineTransfer.name + ' \n' +
                lineTransfer.line_type + ' \n' +
                lineTransfer.markers.length > 1 + ' \n' +
                lineTransfer.danger_level + ' \n' +
                lineTransfer.tree_level + ' \n' +
                lineTransfer.rock_level + ' \n' +
                lineTransfer.cliff_level);
        }
    }
}