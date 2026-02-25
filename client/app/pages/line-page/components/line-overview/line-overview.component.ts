import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ILine, ILineLocation } from '../../../../models/interfaces/types';
import { COLOR_DICTIONARY } from '../../../../dictionary/color-dictionary';
import { ProfileService } from '../../../../core/services/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'app-line-overview',
  templateUrl: './line-overview.component.html',
})
export class LineOverviewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() line: ILine;
  @Input() isEdit: boolean;
  @Input() hasImages: boolean;
  @Output() notifyEdit: EventEmitter<boolean> = new EventEmitter();
  public isOwn: boolean = false;
  public chart: any = {
    type: 'AreaChart',
    columnNames: ['X', 'Y'],
    data: [],
    options: {},
  };
  public activeImage: string;
  public imageAttachedLocations: ILineLocation[];
  public sportColor: string = '#404040';
  private readonly _destroy$ = new Subject<void>();

  constructor(public colorDictionary: COLOR_DICTIONARY, public profileService: ProfileService) {}

  public ngOnInit(): void {
    this.profileService.userProfile$.pipe(takeUntil(this._destroy$)).subscribe((profile) => {
      this.isOwn = !!profile && !!this.line && this.line.username === profile.username;
    });
    this.rebuildViewModel();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['line']) {
      this.rebuildViewModel();
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public setEdit(): void {
    this.notifyEdit.emit(true);
  }

  public onHeightProfileMouseover(event): void {
    if (Array.isArray(this.line.locations[event.position.row].images)) {
      this.activeImage = this.line.locations[event.position.row].images[0];
    }
  }

  private mapChart(): void {
    const newData: any[] = [];
    for (let i = 0; i < this.line.locations.length; i++) {
      const location = this.line.locations[i];
      newData.push([location.distanceFromStart, location.elevation]);
    }
    this.chart.data = newData;
  }

  private rebuildViewModel(): void {
    if (!this.line || !Array.isArray(this.line.locations)) {
      this.imageAttachedLocations = [];
      this.chart.data = [];
      this.sportColor = '#404040';
      return;
    }

    this.sportColor = this.colorDictionary.get(this.line.sport) || '#404040';
    this.imageAttachedLocations = this.line.locations.filter((loc) => Array.isArray(loc.images));
    this.mapChart();
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
      axisFontSize: 4,
      height: 150,
      pointSize: 0,
      areaOpacity: 1,
      colors: [this.sportColor],
      backgroundColor: 'white',
      chartArea: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
  }
}
