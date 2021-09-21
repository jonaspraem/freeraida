import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ILine } from '../../../../models/interfaces/types';

@Component({
  selector: 'app-line-height-profile',
  templateUrl: './line-height-profile.component.html',
})

export class LineHeightProfileComponent implements OnInit {
  @Input() line: ILine;
  public lineChartData: ChartDataSets[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'scatter';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
    this.lineChartData = [
      { data: this.line.locations.map((loc) => ({
        x: loc.elevation,
        y: loc.distanceFromStart
      })), label: 'Series A' },
    ];
  }
}
