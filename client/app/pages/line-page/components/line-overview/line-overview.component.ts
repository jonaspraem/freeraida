import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILine, ILineLocation } from '../../../../models/interfaces/types';
import { COLOR_DICTIONARY } from '../../../../dictionary/color-dictionary';
import { ProfileService } from '../../../../core/services/profile.service';


@Component({
  standalone: false,
  selector: 'app-line-overview',
  templateUrl: './line-overview.component.html',
})
export class LineOverviewComponent implements OnInit {
  @Input() line: ILine;
  @Input() isEdit: boolean;
  @Input() hasImages: boolean;
  @Output() notifyEdit: EventEmitter<boolean> = new EventEmitter();
  public isOwn: boolean = false;
  public chart: any = {
    chartType: 'AreaChart',
    dataTable: null,
    //opt_firstRowIsData: true,
    options: {},
  };
  public activeImage: string;
  public imageAttachedLocations: ILineLocation[];

  constructor(public colorDictionary: COLOR_DICTIONARY, public profileService: ProfileService) {}

  public ngOnInit(): void {
    this.profileService.userProfile$.subscribe((profile) => {
      this.isOwn = this.line.username === profile.username;
    });

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
      colors: [this.colorDictionary.get(this.line.sport)],
      backgroundColor: 'white',
      chartArea: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
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
    const newData: any[] = [['X', 'Y']];
    for (let i = 0; i < this.line.locations.length; i++) {
      const location = this.line.locations[i];
      newData.push([location.distanceFromStart, location.elevation]);
    }
    this.chart.dataTable = newData;
  }
}
