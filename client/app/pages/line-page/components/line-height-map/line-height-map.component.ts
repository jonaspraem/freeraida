import { Component, Input } from '@angular/core';
import { ILine } from '../../../../models/interfaces/types';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-line-height-map',
  templateUrl: './line-height-map.component.html',
})
export class LineHeightMapComponent {
  @Input() line: ILine;
  public chart: GoogleChartInterface = {
    chartType: 'AreaChart',
    dataTable: null,
    //opt_firstRowIsData: true,
    options: {},
  };

  public ngOnInit(): void {
    this.reMapChart();
    this.chart.options = {
      title: 'Height map',
      legend: 'none',
      vAxis: {
        gridlines: {
          count: 0,
        },
        baselineColor: 'none',
      },
      hAxis: {
        gridlines: {
          count: 0,
        },
        baselineColor: 'none',
      },
      axisFontSize: 0,
      height: 400,
      curveType: 'function',
      pointSize: 0,
      colors: ['#5E8894'],
      backgroundColor: 'none',
      chartArea: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
  }

  private reMapChart(): void {
    const newData: any[] = [['X', 'Y']];
    for (let i = 0; i < this.line.locations.length; i++) {
      const location = this.line.locations[i];
      newData.push([location.distanceFromStart, location.elevation]);
    }
    this.chart.dataTable = newData;
  }
}
