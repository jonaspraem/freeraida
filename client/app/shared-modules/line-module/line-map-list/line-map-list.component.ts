import { Component, Input, OnInit } from '@angular/core';
import { ILine, ILineSegment, ILocation } from '../../../models/interfaces/types';
import { CONFIG } from '../../../dictionary/config';
import { COLOR_DICTIONARY } from '../../../dictionary/color-dictionary';
const polyEncoder = require('@mapbox/polyline');
import { flattenLineSegments } from '../../../models/interfaces/line-segment.utils';

@Component({
  standalone: false,
  selector: 'app-line-map-list',
  templateUrl: './line-map-list.component.html',
})

/**
 * @Author Jonas Praem
 * Constructs google static map
 */
export class LineMapListComponent implements OnInit {
  @Input() line: ILine;
  public request: string;

  public ngOnInit(): void {
    this.constructRequest();
  }

  private constructRequest(): void {
    const staticMapUrl = CONFIG.STATIC_MAPS_ENDPOINT;
    const apiKey = CONFIG.getGoogleMapsKey();
    const flattenedLocations = flattenLineSegments(this.line);
    if (flattenedLocations.length === 0) {
      this.request = '';
      return;
    }
    const markerStart = flattenedLocations[0].latitude + ',' + flattenedLocations[0].longitude;
    const markerFinish =
      flattenedLocations[flattenedLocations.length - 1].latitude + ',' + flattenedLocations[flattenedLocations.length - 1].longitude;

    // OPTIONS
    const weight = 3;
    const pathParam = (this.line.segments || [])
      .map((segment: ILineSegment) => {
        const points = (segment.locations || []).map((loc: ILocation) => [loc.latitude, loc.longitude]);
        if (points.length < 2) {
          return '';
        }
        const polyline = polyEncoder.encode(points);
        const segmentColor = this.getSegmentColorEncoded(segment.type);
        return '&path=weight:' + weight + '%7Ccolor:0x' + segmentColor + '%7Cenc:' + polyline;
      })
      .filter((value) => !!value)
      .join('');
    const startColor = 'green';
    const startLabel = 'S';
    const finishColor = 'black';
    const finishLabel = 'F';
    const mapType = 'terrain';

    // PARAMS
    const sizeParam = '?size=250x200';
    const startMarkerParam = '&markers=' + 'color:' + startColor + '%7Clabel:' + startLabel + '%7C' + markerStart;
    const finishMarkerParam = '&markers=' + 'color:' + finishColor + '%7Clabel:' + finishLabel + '%7C' + markerFinish;
    const optionsParam = '&maptype=' + mapType;
    const apiKeyParam = apiKey ? '&key=' + apiKey : '';

    this.request = staticMapUrl + sizeParam + pathParam + startMarkerParam + finishMarkerParam + optionsParam + apiKeyParam;
  }

  private getSegmentColorEncoded(segmentType: string): string {
    const color = COLOR_DICTIONARY.get(segmentType) || '#404040';
    return color.slice(1);
  }
}
