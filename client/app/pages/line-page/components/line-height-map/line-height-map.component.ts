import { Component, Input } from '@angular/core';
import { ILine, ILineLocation, ILineSegment, LineSegmentType } from '../../../../models/interfaces/types';

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
    type: 'LineChart',
    columnNames: ['Distance', 'Freeride', 'Skinning', 'Boot section'],
    data: [],
    options: {
      legend: 'none',
      width: 652,
      height: 300,
      colors: ['#560000', '#448BDD', '#E1BC21'],
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

  private readonly segmentIndex: Record<LineSegmentType, number> = {
    FREERIDE: 1,
    SKINNING: 2,
    BOOT_SECTION: 3,
  };

  private reMapChart(): void {
    if (!this.line || !Array.isArray(this.line.segments)) {
      this.chart.data = [];
      return;
    }

    const segmentRows = this.line.segments.reduce((rows: any[], segment: ILineSegment) => {
      const seriesIndex = this.segmentIndex[segment.type];
      if (!seriesIndex) {
        return rows;
      }
      for (const location of segment.locations || []) {
        rows.push(this.toSegmentChartRow(location, seriesIndex));
      }
      return rows;
    }, []);

    this.chart.data = segmentRows;
    return;
  }

  private toSegmentChartRow(location: ILineLocation, seriesIndex: number): any[] {
    const row = [location.distanceFromStart, null, null, null];
    row[seriesIndex] = location.elevation;
    return row;
  }

  private rebuildViewModel(): void {
    this.reMapChart();
    this.chart.options = {
      legend: 'none',
      width: 652,
      height: 300,
      colors: ['#560000', '#448BDD', '#E1BC21'],
      backgroundColor: 'none',
      chartArea: {
        left: 100,
        right: 50,
        bottom: 50,
        top: 20,
      },
      pointSize: 1,
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
