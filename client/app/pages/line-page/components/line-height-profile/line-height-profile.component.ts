import { Component, Input, OnInit } from '@angular/core';
import { ILine } from '../../../../models/interfaces/types';
import { flattenLineSegments } from '../../../../models/interfaces/line-segment.utils';

@Component({
  standalone: false,
  selector: 'app-line-height-profile',
  templateUrl: './line-height-profile.component.html',
})
export class LineHeightProfileComponent implements OnInit {
  @Input() line: ILine;
  public lineChartData: any[];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'scatter';
  public lineChartPlugins = [];

  constructor() {}

  ngOnInit() {
    const locations = flattenLineSegments(this.line);
    this.lineChartData = [
      {
        data: locations.map((loc) => ({
          x: loc.elevation,
          y: loc.distanceFromStart,
        })),
        label: 'Series A',
      },
    ];
  }
}
