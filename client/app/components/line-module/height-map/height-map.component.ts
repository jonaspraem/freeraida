import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ILine, ILineLocation } from "../../../models/interfaces/types";
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
        chartType: 'Scatter',
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
            hAxis: {
                minValue: 0,
                maxValue: 20
            },
            curveType: 'function',
            pointSize: 2
        },
    };

    public ngOnChanges(changes: SimpleChanges): void {
        console.log('changes', changes);
        this.reMapChart();
    }

    public ngOnInit(): void {
        this.reMapChart();
    }

    private reMapChart(): void {
        const newData: any[] = [['X', 'Y']];
        console.log('input line', this.lineLocations);
        for(let i = 0; i < this.lineLocations.length; i++) {
            const location = this.lineLocations[i];
            newData.push([location.latitude, location.longitude]
            );
        }
        console.log('hello', newData);
        this.chart.dataTable = newData;
    }
}