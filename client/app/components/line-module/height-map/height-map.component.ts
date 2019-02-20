import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { ILineLocation } from "../../../models/interfaces/types";
import { GoogleChartInterface } from "ng2-google-charts/google-charts-interfaces";

@Component({
    selector: 'app-height-map',
    templateUrl: './height-map.component.html'
})

/**
 * @JonasPraem
 * @param takes km from start + height / z coordinate
 */

export class HeightMapComponent implements OnChanges {
    @Input() lineLocations: ILineLocation[];
    public chart: GoogleChartInterface = {
        chartType: 'AreaChart',
        dataTable: [['X', 'Y'],
            [1, 3],
            [2, 2.5],
            [3, 3],
            [4, 4],
            [5, 4],
            [6, 3],
            [7, 2.5],
            [8, 3]
        ],
        //opt_firstRowIsData: true,
        options: {
            title: 'Height map',
            legend: 'none',
            vAxis: {
                minValue: 0,
                maxValue: 20
            },
            height: 500,
            curveType: 'function',
            pointSize: 5,
            colors: ['#508065', '#94CCAD'],
            backgroundColor: 'none',
            chartArea: {
                left: 80,
                top: 5,
                right: 5,
                bottom: 5,
            }
        },
    };
    private _isLoaded: boolean = false;

    constructor(
        private _cdRef: ChangeDetectorRef
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        this.reMapChart();
    }

    public ngOnInit(): void {}

    public onChartReady(): void {
        this._isLoaded = true;
        this.reMapChart();
    }

    private reMapChart(): void {
        const newData: any[] = [['X', 'Y']];
        for(let i = 0; i < this.lineLocations.length; i++) {
            const location = this.lineLocations[i];
            newData.push([location.distanceFromStart, location.elevation]);
        }
        // let copyChart = this.chart;
        // copyChart.dataTable = newData;
        // this.chart.component.data = copyChart;
        this._cdRef.detectChanges();
        if (this._isLoaded) {
            this.chart.dataTable = newData;
            this.chart.component.draw();
        }
    }
}