import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILine } from '../../../../models/interfaces/types';
import { COLOR_DICTIONARY } from '../../../../dictionary/color-dictionary';
import { ProfileService } from '../../../../core/services/profile.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-line-overview',
  templateUrl: './line-overview.component.html',
})
export class LineOverviewComponent implements OnInit {
  @Input() line: ILine;
  @Input() isEdit: boolean;
  @Output() notifyEdit: EventEmitter<boolean> = new EventEmitter();
  public isOwn: boolean = false;
  public chart: GoogleChartInterface = {
    chartType: 'AreaChart',
    dataTable: null,
    //opt_firstRowIsData: true,
    options: {},
  };

  constructor(public colorDictionary: COLOR_DICTIONARY, public profileService: ProfileService) {}

  public ngOnInit(): void {
    this.profileService.userProfile$.subscribe((profile) => {
      this.isOwn = this.line.username === profile.username;
    });

    this.mapChart();
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
      height: 250,
      curveType: 'function',
      pointSize: 1,
      colors: [this.colorDictionary.get(this.line.sport)],
      backgroundColor: 'none',
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

  private mapChart(): void {
    const newData: any[] = [['X', 'Y']];
    for (let i = 0; i < this.line.locations.length; i++) {
      const location = this.line.locations[i];
      newData.push([location.distanceFromStart, location.elevation]);
    }
    this.chart.dataTable = newData;
  }
}
