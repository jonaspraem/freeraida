import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
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

export class HeightMapComponent implements OnInit {
    @Input() lineLocations: ILineLocation[];
    @Input() color: string = '#508065';
    public chart: GoogleChartInterface = {
        chartType: 'AreaChart',
        dataTable: null,
        //opt_firstRowIsData: true,
        options: {},
    };
    private _isLoaded: boolean = false;

    public ngOnInit(): void {
        this.reMapChart();
        this.chart.options = {
            title: 'Height map',
            legend: 'none',
            vAxis: {
                minValue: 0,
                maxValue: 20
            },
            axisFontSize: 0,
            height: 170,
            curveType: 'function',
            pointSize: 5,
            colors: [this.color],
            backgroundColor: 'none',
            chartArea: {
                left: 80,
                top: 5,
                right: 5,
                bottom: 5,
            },
        }
    }

    public onChartReady(): void {
        this._isLoaded = true;
    }

    private reMapChart(): void {
        const newData: any[] = [['X', 'Y']];
        for(let i = 0; i < this.lineLocations.length; i++) {
            const location = this.lineLocations[i];
            newData.push([location.distanceFromStart, location.elevation]);
        }
        this.chart.dataTable = newData;
    }
}