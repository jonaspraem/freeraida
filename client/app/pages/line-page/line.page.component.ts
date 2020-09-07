import { LineOverviewComponent } from './components/line-overview/line-overview.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineService } from '../../core/services/line.service';
import { ILine } from '../../models/interfaces/types';

@Component({
  selector: 'app-line-page',
  templateUrl: './line.page.component.html',
})
export class LinePageComponent implements OnInit {
  @ViewChild(LineOverviewComponent) lineOverview: LineOverviewComponent;
  public line: ILine;
  public hasImages: boolean = false;
  public isEdit: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private _lineService: LineService) {}

  public ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this._lineService.getLine(id).subscribe((line) => {
        this.line = line;
        this.checkImages(line);
      });
    });
  }

  public toggleEdit(value?: boolean): void {
    if (value != null) {
      this.isEdit = value;
    } else {
      this.isEdit = !this.isEdit;
    }
  }

  public saveEdit(): void {
    this.onUpdateLine();
    this.toggleEdit(false);
  }

  private onUpdateLine(): void {
    const newLine = this.line;
    newLine.name = this.lineOverview.line.name;
    this._lineService.updateLine(newLine).subscribe(
      (line) => console.log('new line updated', line),
      (err) => console.log('err')
    );
  }

  private checkImages(line: ILine): void {
    const imageAttachedLocations = line.locations.filter((loc) => Array.isArray(loc.images));
    this.hasImages = imageAttachedLocations.length > 0;
  }
}
