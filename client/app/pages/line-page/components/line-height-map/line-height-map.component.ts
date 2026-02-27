import { Component, Input } from '@angular/core';
import { ILine } from '../../../../models/interfaces/types';

import { COLOR_DICTIONARY } from '../../../../dictionary/color-dictionary';

@Component({
  standalone: false,
  selector: 'app-line-height-map',
  templateUrl: './line-height-map.component.html',
  styleUrls: ['./line-height-map.component.scss'],
})
export class LineHeightMapComponent {
  @Input()
  public set line(value: ILine) {
    this._line = value;
    this.rebuildViewModel();
  }

  public get line(): ILine {
    return this._line;
  }
  public chart: any = {
    type: 'AreaChart',
    columnNames: ['X', 'Y'],
    data: [],
    options: {
      legend: 'none',
      width: 652,
      height: 300,
      colors: ['#404040'],
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
    },
  };
  private _line: ILine;

  constructor(public colorDictionary: COLOR_DICTIONARY) {}

  private reMapChart(): void {
    const newData: any[] = [];
    if (!this.line || !Array.isArray(this.line.locations)) {
      this.chart.data = newData;
      return;
    }

    for (let i = 0; i < this.line.locations.length; i++) {
      const location = this.line.locations[i];
      newData.push([location.distanceFromStart, location.elevation]);
    }
    this.chart.data = newData;
  }

  private rebuildViewModel(): void {
    this.reMapChart();
    this.chart.options = {
      legend: 'none',
      width: 652,
      height: 300,
      colors: [this.colorDictionary.get(this.line?.sport) || '#404040'],
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
}
