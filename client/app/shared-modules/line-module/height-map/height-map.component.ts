import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ILineLocation, ILineSegment, LineSegmentType } from '../../../models/interfaces/types';
import { COLOR_DICTIONARY } from '../../../dictionary/color-dictionary';

@Component({
  standalone: false,
  selector: 'app-height-map',
  templateUrl: './height-map.component.html',
})

/**
 * @JonasPraem
 * @param takes km from start + height / z coordinate
 */
export class HeightMapComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() lineLocations: ILineLocation[] = [];
  @Input() lineSegments: ILineSegment[] = [];
  @Input() color: string = '#508065';
  @Input() hideLegend: boolean = false;
  @ViewChild('chartContainer') chartContainer?: ElementRef<HTMLDivElement>;
  public chart: any = {
    type: 'AreaChart',
    columnNames: ['Distance', 'Freeride', 'Skinning', 'Boot section'],
    data: [],
    options: {},
  };
  private _isLoaded: boolean = false;
  private _resizeObserver?: ResizeObserver;
  private _chartWidth: number | null = null;

  private readonly segmentIndex: Record<LineSegmentType, number> = {
    FREERIDE: 1,
    SKINNING: 2,
    BOOT_SECTION: 3,
  };

  constructor(private readonly colorDictionary: COLOR_DICTIONARY) {}

  public ngOnInit(): void {
    this.chart.options = this.buildChartOptions();
    this.reMapChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['lineLocations'] || changes['lineSegments'] || changes['color'] || changes['hideLegend']) {
      this.reMapChart();
      this.chart.options = {
        ...this.buildChartOptions(),
        ...(this._chartWidth ? { width: this._chartWidth } : {}),
      };
    }
  }

  public ngAfterViewInit(): void {
    this.updateChartWidth();
    if (this.chartContainer && typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => {
        this.updateChartWidth();
      });
      this._resizeObserver.observe(this.chartContainer.nativeElement);
    }
  }

  public ngOnDestroy(): void {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  public onChartReady(): void {
    this._isLoaded = true;
  }

  private reMapChart(): void {
    if (Array.isArray(this.lineSegments) && this.lineSegments.length > 0) {
      const segmentRows = this.lineSegments.reduce((rows: any[], segment: ILineSegment) => {
        const seriesIndex = this.segmentIndex[segment.type];
        if (!seriesIndex) {
          return rows;
        }
        for (const location of segment.locations || []) {
          if (location?.distanceFromStart == null || location?.elevation == null) {
            continue;
          }
          const row: any[] = [location.distanceFromStart, null, null, null];
          row[seriesIndex] = location.elevation;
          rows.push(row);
        }
        return rows;
      }, []);
      this.chart.data = segmentRows;
    } else {
      const newData: any[] = [];
      for (let i = 0; i < (this.lineLocations?.length ?? 0); i++) {
        const location = this.lineLocations[i];
        if (location?.distanceFromStart == null || location?.elevation == null) {
          continue;
        }
        newData.push([location.distanceFromStart, location.elevation, null, null]);
      }
      this.chart.data = newData;
    }
  }

  private buildChartOptions(): any {
    return {
      title: 'Height map',
      legend: this.hideLegend ? 'none' : { position: 'top' },
      vAxis: {
        gridlines: {
          count: 0,
        },
        minValue: 0,
        baselineColor: 'none',
      },
      hAxis: {
        gridlines: {
          count: 0,
        },
        baselineColor: 'none',
      },
      axisFontSize: 0,
      height: 170,
      pointSize: 0,
      colors: [
        this.colorDictionary.getSegmentColor('FREERIDE'),
        this.colorDictionary.getSegmentColor('SKINNING'),
        this.colorDictionary.getSegmentColor('BOOT_SECTION'),
      ],
      backgroundColor: 'none',
      chartArea: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
  }

  private updateChartWidth(): void {
    const width = Math.floor(this.chartContainer?.nativeElement?.clientWidth ?? 0);
    if (!width || width === this._chartWidth) {
      return;
    }

    this._chartWidth = width;
    this.chart.options = {
      ...this.chart.options,
      width: this._chartWidth,
    };
  }
}
