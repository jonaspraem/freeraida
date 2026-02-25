import { Component, Input } from '@angular/core';
import { ILine } from '../../../../models/interfaces/types';

import { COLOR_DICTIONARY } from '../../../../dictionary/color-dictionary';

@Component({
  standalone: false,
  selector: 'app-line-height-map',
  templateUrl: './line-height-map.component.html',
})
export class LineHeightMapComponent {
  @Input() line: ILine;
  public chart: any = {
    type: 'AreaChart',
    columnNames: ['X', 'Y'],
    data: [],
    options: {},
  };

  constructor(public colorDictionary: COLOR_DICTIONARY) {}

  public ngOnInit(): void {
    this.reMapChart();
    this.chart.options = {
      legend: 'none',
      width: 652,
      height: 300,
      colors: [this.colorDictionary.get(this.line.sport)],
      areaOpacity: 0.5,
      backgroundColor: 'none',
      chartArea: {
        left: 100,
        right: 50,
        bottom: 50,
        top: 20,
      },
      pointSize: 2,
      vAxis: {
        title: 'Height above sea level',
        format: '#m',
        textStyle: {
          italic: false,
          fontName: 'K2D',
          color: '#8c2322',
        },
        titleTextStyle: {
          italic: false,
          fontName: 'K2D',
          color: 'black',
          fontSize: 12,
        },
      },
      hAxis: {
        title: 'Distance from start',
        format: '#.#km',
        textStyle: {
          italic: false,
          fontName: 'K2D',
          color: '#8c2322',
        },
        titleTextStyle: {
          italic: false,
          fontName: 'K2D',
          color: 'black',
          fontSize: 12,
        },
      },
    };
  }

  private reMapChart(): void {
    const newData: any[] = [];
    for (let i = 0; i < this.line.locations.length; i++) {
      const location = this.line.locations[i];
      newData.push([location.distanceFromStart, location.elevation]);
    }
    this.chart.data = newData;
  }
}
