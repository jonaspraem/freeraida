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
import { ILineLocation } from '../../../models/interfaces/types';

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
  @Input() color: string = '#508065';
  @Input() hideLegend: boolean = false;
  @ViewChild('chartContainer') chartContainer?: ElementRef<HTMLDivElement>;
  public chart: any = {
    type: 'AreaChart',
    columnNames: ['X', 'Y'],
    data: [],
    options: {
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
    },
  };
  private _isLoaded: boolean = false;
  private _resizeObserver?: ResizeObserver;
  private _chartWidth: number | null = null;

  public ngOnInit(): void {
    this.chart.options = {
      title: 'Height map',
      legend: 'none',
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
      // areaOpacity: 0.5,
      colors: [this.color],
      backgroundColor: 'none',
      chartArea: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
    this.reMapChart();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['lineLocations'] || changes['color'] || changes['hideLegend']) {
      this.reMapChart();
      this.chart.options = {
        ...this.chart.options,
        colors: [this.color],
        legend: this.hideLegend ? 'none' : { position: 'top' },
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
    const newData: any[] = [];
    for (let i = 0; i < (this.lineLocations?.length ?? 0); i++) {
      const location = this.lineLocations[i];
      if (location?.distanceFromStart == null || location?.elevation == null) {
        continue;
      }
      newData.push([location.distanceFromStart, location.elevation]);
    }
    this.chart.data = newData;
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
